import { useState, useEffect } from 'react';

interface UsePressAnimationOptions {
  minPressDuration?: number;
  eventDebounceTime?: number;
  onTouchEnd?: () => void;
  onTouchDevice?: () => void;
}

interface UsePressAnimationReturn {
  isPressed: boolean;
  isHovered: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
  handleMouseDown: () => void;
  handleMouseUp: () => void;
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
}

export function usePressAnimation(
  options: UsePressAnimationOptions = {}
): UsePressAnimationReturn {
  const {
    minPressDuration = 150,
    eventDebounceTime = 50,
    onTouchEnd,
    onTouchDevice,
  } = options;

  const [isPressed, setIsPressed] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [pressStartTime, setPressStartTime] = useState<number>(0);
  const [pressTimeoutId, setPressTimeoutId] = useState<NodeJS.Timeout | null>(
    null
  );
  const [lastEventTime, setLastEventTime] = useState<number>(0);
  const [lastEventType, setLastEventType] = useState<string>('');
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  const isDuplicateEvent = (
    eventType: string,
    eventAction: string
  ): boolean => {
    const currentTime = Date.now();
    const eventKey = `${eventType}-${eventAction}`;

    // Check if this is a duplicate event within the debounce window
    if (
      currentTime - lastEventTime < eventDebounceTime &&
      (lastEventType === eventKey ||
        (eventAction === 'down' && lastEventType.includes('down')) ||
        (eventAction === 'up' && lastEventType.includes('up')))
    ) {
      return true;
    }

    setLastEventTime(currentTime);
    setLastEventType(eventKey);
    return false;
  };

  const startPress = (eventType: 'mouse' | 'touch'): void => {
    // Mark as touch device if touch event is detected
    if (eventType === 'touch') {
      setIsTouchDevice(true);
      onTouchDevice?.();
    }

    // On touch devices, ignore mouse events
    if (isTouchDevice && eventType === 'mouse') {
      return;
    }

    if (isDuplicateEvent(eventType, 'down')) {
      return;
    }

    const currentTime = Date.now();
    setPressStartTime(currentTime);
    setIsPressed(true);

    // Clear any existing timeout
    if (pressTimeoutId) {
      clearTimeout(pressTimeoutId);
    }
  };

  const endPress = (eventType: 'mouse' | 'touch'): void => {
    // On touch devices, ignore mouse events
    if (isTouchDevice && eventType === 'mouse') {
      return;
    }

    if (isDuplicateEvent(eventType, 'up')) {
      return;
    }

    const currentTime = Date.now();
    const pressDuration = currentTime - pressStartTime;

    // On touch devices, trigger the callback
    if (eventType === 'touch') {
      onTouchEnd?.();
    }

    if (pressDuration < minPressDuration) {
      // If the press was too fast, keep it pressed for the minimum duration
      const remainingTime = minPressDuration - pressDuration;
      const timeoutId = setTimeout(() => {
        setIsPressed(false);
        setPressTimeoutId(null);
      }, remainingTime);
      setPressTimeoutId(timeoutId);
    } else {
      // Press was long enough, release immediately
      setIsPressed(false);
    }
  };

  const handleMouseEnter = (): void => {
    setIsHovered(true);
  };

  const handleMouseLeave = (): void => {
    setIsHovered(false);
    setIsPressed(false);
    if (pressTimeoutId) {
      clearTimeout(pressTimeoutId);
      setPressTimeoutId(null);
    }
  };

  const handleMouseDown = (): void => {
    startPress('mouse');
  };

  const handleMouseUp = (): void => {
    endPress('mouse');
  };

  const handleTouchStart = (): void => {
    startPress('touch');
  };

  const handleTouchEnd = (): void => {
    endPress('touch');
  };

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (pressTimeoutId) {
        clearTimeout(pressTimeoutId);
      }
    };
  }, [pressTimeoutId]);

  return {
    isPressed,
    isHovered,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseDown,
    handleMouseUp,
    handleTouchStart,
    handleTouchEnd,
  };
}
