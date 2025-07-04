const paragraphsByTime = {
   30: [ // 30 Second paragraph(s)
    ". As you begin to practice regularly, your fingers start to move instinctively, guided by familiarity with the keyboard rather than conscious thought. That’s when the magic begins: your mind can focus on the content, while your fingers do the work. Typing is an essential skill in today's digital world. Practicing regularly can improve speed and accuracy, helping you communicate more efficiently and confidently."
  ],
  60: [ // 1 minute paragraph(s)
    "Typing is not just about speed—it's about rhythm, flow, and muscle memory. As you begin to practice regularly, your fingers start to move instinctively, guided by familiarity with the keyboard rather than conscious thought. That’s when the magic begins: your mind can focus on the content, while your fingers do the work. Typing is an essential skill in today's digital world. Practicing regularly can improve speed and accuracy, helping you communicate more efficiently and confidently."
  ],
  120: [ // 2 minutes
    "Learning to type quickly and accurately is one of the most valuable skills in the modern world, where communication, creativity, and productivity often depend on the keyboard. Whether you're writing an email, coding a new app, or crafting an essay, your ability to transfer thoughts to the screen efficiently can make a huge difference. Typing is not just about speed—it's about rhythm, flow, and muscle memory. As you begin to practice regularly, your fingers start to move instinctively, guided by familiarity with the keyboard rather than conscious thought.  Technology has transformed how we live, work, and learn. From smartphones to AI, innovations continue to make life more connected and convenient for people around the globe. Regular typing practice boosts productivity and opens new career opportunities."
  ],
  180: [ // 3 minutes
    "To become a true typing master, consistency is key. Daily practice, even just ten minutes at a time, can lead to noticeable improvement. Make sure you're using proper posture and hand positioning, with your fingers resting lightly on the home row and your eyes on the screen rather than the keys. At first, it might feel awkward or even frustrating. Mistakes will happen, and progress may seem slow. But with time, you’ll find yourself typing entire paragraphs without needing to glance down once. As your accuracy improves, so will your speed. And once you've reached a solid level of proficiency, the real benefits begin to show. You’ll be able to respond faster to messages, take better notes, work more efficiently, and even express yourself more fluidly. Learning to type well saves time and reduces errors in writing emails, reports, and messages, making you more productive in both professional and personal tasks. Consistent practice with a variety of paragraphs helps build muscle memory and familiarity with the keyboard layout, boosting typing performance over time."
  ],
  240: [ // 4 minutes
    "Typing might seem like a simple task, but it's a skill that opens the door to nearly every opportunity in our digital world. From writing essays and emails to programming and data entry, typing connects ideas to action. The faster and more accurately you type, the more effortlessly you can communicate and create. But speed isn’t everything. Accuracy matters just as much, if not more. That’s why the best typists start by focusing on precision, letting speed come naturally as their fingers grow more familiar with the layout of the keyboard. Practice is essential. Even just a few minutes each day can lead to rapid improvement. Use both hands, rest your fingers on the home row keys, and try not to look down at the keyboard. The more you rely on your sense of touch, the stronger your muscle memory becomes. And when muscle memory takes over, typing begins to feel almost automatic — your thoughts translate directly into words without hesitation. Typing tests are a great way to track your progress. Incorporating typing exercises into your daily routine can enhance focus, hand-eye coordination, and even cognitive skills like memory and concentration. Modern typing tutors often include real-time feedback on speed and accuracy, allowing users to track progress and identify areas for improvement. Effective typing skills open opportunities in careers such as programming, writing, data entry, and many other fields requiring fast and accurate computer use."
  ],
  300: [ // 5 minutes
    "In some ways, typing is like playing an instrument. It’s all about muscle memory, coordination, and practice. And just like a musician doesn’t look at their hands while performing, a skilled typist doesn’t look at the keyboard—they trust their training. The key is to keep challenging yourself. Try increasing the difficulty of the text you're typing, or setting time goals. Use typing tests to track your words per minute and monitor your accuracy rate. Celebrate small milestones, like reaching 40, 60, or 80 WPM, and remember that everyone improves at their own pace. Over time, you’ll become not just faster, but more confident. And that confidence will carry over into every task you do on a computer. Whether you're writing a report, chatting with friends, or working on a novel, your typing skill will quietly support everything you do. In a world where digital communication is everywhere, being a typing master gives you a real edge—so keep practicing, stay focused, and enjoy the process The digital age demands proficiency with keyboards across devices, including laptops, tablets, and smartphones, making typing a universal skill. Using proper finger placement and posture while typing helps prevent strain and injuries like repetitive strain syndrome (RSS) or carpal tunnel syndrome. Advanced typing practice includes timed tests, different content types, and typing under pressure to simulate real-world scenarios and boost confidence. Technology continues to evolve rapidly, and staying skilled with typing ensures you keep pace with the demands of a connected, fast-moving world. Embracing daily practice leads to improved speed, accuracy, and overall communication efficiency."
  ]
};

const textDisplay = document.getElementById('text-display');
const inputArea = document.getElementById('input-area');
const timerEl = document.getElementById('timer');
const wpmEl = document.getElementById('wpm');
const accuracyEl = document.getElementById('accuracy');
const nextBtn = document.getElementById('next-btn');
const timerSelect = document.getElementById('timer-select');
const resultContainer = document.getElementById('result-container');

let currentParagraphs = [];
let currentParagraphIndex = 0;
let startTime = null, timerInterval = null, countdownInterval = null;
let countdownTime = 0, testEnded = false;
let isUpdating = false;

// Load paragraphs for current selected timer duration
function loadParagraphsForTimer() {
  const selectedTime = +timerSelect.value;
  currentParagraphs = paragraphsByTime[selectedTime] || [];
  currentParagraphIndex = 0;
  loadParagraph(currentParagraphIndex);
  resetStats();
}

function loadParagraph(idx) {
  if (!currentParagraphs.length) return;

  textDisplay.innerHTML = '';
  currentParagraphs[idx].split('').forEach(ch => {
    const span = document.createElement('span');
    span.innerText = ch;
    textDisplay.appendChild(span);
  });
  inputArea.value = '';
  inputArea.disabled = false;
  inputArea.focus();
  resetStats();
}

function resetStats() {
  startTime = null;
  testEnded = false;
  clearInterval(timerInterval);
  clearInterval(countdownInterval);
  resultContainer.innerHTML = '';
  timerEl.textContent = '0.00';
  wpmEl.textContent = '0';
  accuracyEl.textContent = '100';
  timerSelect.disabled = false;
}

function startTimer() {
  startTime = new Date();
  timerInterval = setInterval(() => {
    const elapsed = (new Date() - startTime) / 1000;
    updateStats(elapsed);
  }, 100);

  countdownTime = +timerSelect.value;
  timerEl.textContent = `${countdownTime}s`;

  countdownInterval = setInterval(() => {
    if (countdownTime <= 0) return endTest();
    timerEl.textContent = `${--countdownTime}s`;
    timerSelect.disabled = true;
  }, 1000);
}

function updateStats(elapsed = 0) {
  wpmEl.textContent = calculateWPM(elapsed, inputArea.value);
  accuracyEl.textContent = calculateAccuracy();
}

function endTest() {
  clearInterval(timerInterval);
  clearInterval(countdownInterval);
  testEnded = true;
  inputArea.disabled = true;
  timerSelect.disabled = false;

  const elapsed = +timerSelect.value - countdownTime;
  const speed = calculateWPM(elapsed, inputArea.value);
  const accuracy = calculateAccuracy();
  resultContainer.innerHTML = `
    <h3>⏱️ Test Complete!</h3>
    <p><strong>Speed:</strong> ${speed} WPM</p>
    <p><strong>Accuracy:</strong> ${accuracy}%</p>
    <p><strong>Time Taken:</strong> ${elapsed} seconds</p>
  `;
}

function calculateWPM(sec, text) {
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return sec ? Math.round((words / sec) * 60) : 0;
}

function calculateAccuracy() {
  const spans = textDisplay.querySelectorAll('span');
  const typed = inputArea.value.split('');
  let correctChars = 0;
  typed.forEach((ch, i) => {
    if (ch === spans[i]?.innerText) correctChars++;
  });
  return typed.length ? ((correctChars / typed.length) * 100).toFixed(2) : 100;
}

inputArea.addEventListener('input', () => {
  if (testEnded) return;

  if (!startTime && inputArea.value.length) startTimer();

  if (!isUpdating) {
    isUpdating = true;
    requestAnimationFrame(() => {
      updateHighlightAndScroll();
      isUpdating = false;
    });
  }
});

function updateHighlightAndScroll() {
  const typed = inputArea.value.split('');
  const spans = textDisplay.querySelectorAll('span');

  // Highlight correct/incorrect characters
  spans.forEach((span, i) => {
    span.classList.remove('correct', 'incorrect');
    if (typed[i] === span.innerText) {
      span.classList.add('correct');
    } else if (typed[i]) {
      span.classList.add('incorrect');
    }
  });

  // Count typed words
  const wordCount = inputArea.value.trim().split(/\s+/).filter(Boolean).length;

  // Get scroll metrics
  const maxScroll = textDisplay.scrollHeight - textDisplay.clientHeight;

  // SCROLL LOGIC
  if (wordCount === 50) {
    // Scroll to 50% of the scroll height
    textDisplay.scrollTop = maxScroll * 0.5;
  } else if (wordCount === 100) {
    // Scroll all the way up (0%)
    textDisplay.scrollTop = 0;
  }

  // Keep input box scroll position natural
  inputArea.scrollTop = inputArea.scrollHeight;
}



nextBtn.addEventListener('click', () => {
  if (testEnded) return;
  if (currentParagraphIndex + 1 < currentParagraphs.length) {
    currentParagraphIndex++;
  } else {
    currentParagraphIndex = 0;
  }
  loadParagraph(currentParagraphIndex);
});

timerSelect.addEventListener('change', () => {
  // Reset and load new paragraphs on timer change
  clearInterval(timerInterval);
  clearInterval(countdownInterval);
  testEnded = false;
  inputArea.disabled = false;
  loadParagraphsForTimer();
});
const typingBox = document.querySelector('.typing-box');

function updateContent(text) {
  typingBox.textContent = text;

  // Auto-scroll to the bottom
  typingBox.scrollTop = typingBox.scrollHeight;
}

// Initial load based on default timer selection
loadParagraphsForTimer();
