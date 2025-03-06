'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@radix-ui/themes';
import {
  EnvelopeClosedIcon,
  ClipboardCopyIcon,
  CheckIcon,
} from '@radix-ui/react-icons';
import * as Toast from '@radix-ui/react-toast';
import { useLanguage } from '../src/i18n/LanguageProvider';

const EmailButton = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const { messages } = useLanguage();

  const email = 'bayoud.hugo@hotmail.com';

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCopied) {
      timer = setTimeout(() => {
        setIsCopied(false);
      }, 10000);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isCopied]);

  const handleCopyEmail = () => {
    navigator.clipboard
      .writeText(email)
      .then(() => {
        setIsCopied(true);
        setShowToast(true);

        // Hide toast after 3 seconds
        setTimeout(() => {
          setShowToast(false);
        }, 3000);
      })
      .catch((err) => {
        console.error('Failed to copy email: ', err);
      });
  };

  return (
    <Toast.Provider swipeDirection="right">
      <Button
        variant="outline"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        onClick={handleCopyEmail}
      >
        {isCopied ? (
          <CheckIcon />
        ) : isHovering ? (
          <ClipboardCopyIcon />
        ) : (
          <EnvelopeClosedIcon />
        )}
        {isHovering || isCopied
          ? email
          : messages.strategies.header.social.email}
      </Button>

      <Toast.Root
        className="bg-green-100 rounded-md flex flex-row gap-2 p-4 items-center"
        open={showToast}
        onOpenChange={setShowToast}
      >
        <Toast.Title className="text-green-900 flex-1">
          {messages.common.emailCopied}
        </Toast.Title>
        <Toast.Action className="[grid-area:_action]" asChild altText="Close">
          <Button color="green">
            <CheckIcon />
          </Button>
        </Toast.Action>
      </Toast.Root>

      <Toast.Viewport className="[--viewport-padding:_25px] fixed bottom-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
    </Toast.Provider>
  );
};

export default EmailButton;
