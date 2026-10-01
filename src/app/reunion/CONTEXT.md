# Réunion quiz

A self-paced, Kahoot-style quiz about Réunion Island, served on `reunion.hugobayoud.com` (`hugobayoud.com/reunion` and `reunion.hugobayoud.fr` redirect there). Opening the URL starts the quiz directly — there is no landing page.

## Language

**Quiz**:
The fixed, ordered sequence of Questions about Réunion Island, authored by hand and shipped with the site. There is exactly one Quiz, and it is frozen once Players have the URL — it never changes afterwards.
_Avoid_: Game, test, survey.

**Player**:
The single person taking the Quiz on their own device, typically a phone, at their own pace. Their progress belongs to that device only.
_Avoid_: User, participant, visitor.

Several Players often take the Quiz at the same time in the same room and talk out loud, but the Quiz itself is strictly single-player: nothing is shared between devices.

### Content

**Question**:
One authored item of the Quiz: a prompt, exactly four Choices, one Correct choice, and an Explanation. This is the data; it is displayed across three Steps.
_Avoid_: Card, slide, item.

**Choice**:
One of the four proposed answers to a Question, shown in the order authored. Its position gives it a fixed colour and Pin that Players can name out loud: Lave (volcano), Lagon (dolphin), Soleil (sun), Forêt (palm tree).
_Avoid_: Option, proposition, answer.

**Pin**:
The enamel-pin illustration of a Choice position, shown on the Choice and again on the Pick and Reveal steps.
_Avoid_: Icon, shape, symbol.

**Correct choice**:
The one Choice of a Question that is right.
_Avoid_: Solution, right answer.

**Explanation**:
The content shown below the Correct choice on the Reveal step: a free, ordered sequence of text passages and photo Carousels, authored per Question.
_Avoid_: Details, description, more info.

**Carousel**:
A horizontally swipeable row of photos inside an Explanation. Tapping a photo opens the Viewer on it.
_Avoid_: Gallery, slider, slideshow.

**Viewer**:
The full-screen, black-backed display of one Carousel's photos: swipe between them, pinch or double-tap to zoom, close with the cross, a swipe down, or the phone's back gesture. No captions.
_Avoid_: Lightbox, modal, zoom view.

### Playing

**Preparing screen**:
The blocking screen shown on a Player's first visit while the whole Quiz (every Question and every photo) is saved to the device. Once it completes, the Quiz can be played and replayed with no connection at all.
_Avoid_: Loading screen, splash, download page.

**Step**:
One screen of a Question. Every Question has three, always in this order: Prompt step → Pick step → Reveal step.
_Avoid_: Page, view, stage.

**Prompt step**:
The Step showing the Question's prompt and its four Choices to pick from.
_Avoid_: Question page.

**Pick step**:
The Step showing the Player's current Answer in large type, with the prompt small above it — the screen a Player holds up to show the room. Going back from here to change the Answer is expected.
_Avoid_: Confirmation, selected screen.

**Reveal step**:
The Step showing the points earned (green "+3 points", or red "+0 points" with a reminder of the Player's Answer), the Correct choice, then the Explanation. May scroll.
_Avoid_: Answer page, solution page.

**Answer**:
The Choice the Player currently holds for a Question. It can be changed at any time by going back to the Prompt step; only the latest Answer counts.
_Avoid_: Response, selection, vote.

**Frontier**:
The furthest Step the Player has reached. They can move freely back and forth between the first Step and the Frontier; only the Step's own action (picking a Choice, tapping the Pick step, "Question suivante") pushes it further. Changing an earlier Answer never moves it back. Reopening the Quiz always lands the Player on their Frontier.
_Avoid_: Progress, high-water mark, current step.

**Score**:
Three points for every Question whose Answer is the Correct choice, zero otherwise, counted at the moment it is shown (out of three times the number of Questions). Indicative only — it is not protected against changing Answers after a Reveal.
_Avoid_: Result, total.

**Score screen**:
The final screen of the Quiz, shown after the last Question, displaying the Player's Score and offering a Restart.
_Avoid_: Results page, end page.

**Restart**:
Wiping the Player's Answers so they begin the Quiz again from the first Question's Prompt step. Offered only on the Score screen, after a confirmation. The saved Quiz stays on the device — no new Preparing screen.
_Avoid_: Reset, replay.

**Re-download**:
The escape hatch that wipes everything the Quiz saved on the device — Answers, Frontier, and the saved Quiz itself (texts and photos) — and shows the Preparing screen again. Meant only for a broken download. Offered on the Preparing screen when the download fails (as "Réessayer" — a failed download always starts over from scratch), and otherwise only through the Secret tap.
_Avoid_: Reset, refresh, clear cache.

**Secret tap**:
Ten quick taps in a row on an empty, non-interactive part of any screen except the Pick step (which has no empty part — tapping it advances). It opens a dialog with a short explanation and a red "Retélécharger" button — a hidden developer mode, never advertised to Players.
_Avoid_: Easter egg, debug menu, dev mode.
