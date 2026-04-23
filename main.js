(function () {
  const homeCards = document.getElementById("homeClassCards");
  if (homeCards) {
    homeCards.innerHTML = SITE_DATA.classes.map(cls => `
      <article class="class-card">
        <h3>Class ${cls}</h3>
        <p>Subject-wise solutions, notes, and exam resources.</p>
        <a href="class.html?class=${cls}">Open Class ${cls} →</a>
      </article>
    `).join("");
  }

  const classesList = document.getElementById("allClasses");
  if (classesList) {
    classesList.innerHTML = SITE_DATA.classes.map(cls => `
      <article class="class-card">
        <h3>Class ${cls}</h3>
        <p>${(SITE_DATA.subjectsByClass[cls] || []).length} subjects available</p>
        <a href="class.html?class=${cls}">View Subjects →</a>
      </article>
    `).join("");
  }

  const params = new URLSearchParams(window.location.search);
  const classNum = Number(params.get("class"));
  const subjectName = params.get("subject");
  const chapterId = Number(params.get("chapter"));

  const classTitle = document.getElementById("classTitle");
  const classSubjects = document.getElementById("classSubjects");
  if (classTitle && classSubjects && classNum) {
    classTitle.textContent = `Class ${classNum} GSEB English Medium Solutions`;
    const subjects = SITE_DATA.subjectsByClass[classNum] || [];
    classSubjects.innerHTML = subjects.map(sub => `
      <article class="card">
        <span class="tag">Class ${classNum}</span>
        <h3>${sub}</h3>
        <p>Chapter-wise textbook solutions and practice resources.</p>
        <a href="subject.html?class=${classNum}&subject=${encodeURIComponent(sub)}">Open ${sub} →</a>
      </article>
    `).join("");
  }

  const subjectTitle = document.getElementById("subjectTitle");
  const chapterList = document.getElementById("chapterList");
  if (subjectTitle && chapterList && classNum && subjectName) {
    subjectTitle.textContent = `Class ${classNum} ${subjectName} Solutions`;

    const chapterData = classNum === 6 && subjectName === SITE_DATA.sampleClass6English.subject
      ? SITE_DATA.sampleClass6English.chapters
      : Array.from({ length: 8 }, (_, i) => ({ id: i + 1, title: `${subjectName} Chapter ${i + 1}` }));

    chapterList.innerHTML = chapterData.map(ch => `
      <li>
        <span>${ch.id}. ${ch.title}</span>
        <a href="chapter.html?class=${classNum}&subject=${encodeURIComponent(subjectName)}&chapter=${ch.id}">View Q&A →</a>
      </li>
    `).join("");
  }

  const chapterTitle = document.getElementById("chapterTitle");
  const chapterBody = document.getElementById("chapterBody");
  if (chapterTitle && chapterBody && classNum && subjectName && chapterId) {
    chapterTitle.textContent = `Class ${classNum} ${subjectName} - Chapter ${chapterId} Solutions`;

    const match = SITE_DATA.sampleClass6English.chapters.find(c => c.id === chapterId);

    if (classNum === 6 && subjectName === SITE_DATA.sampleClass6English.subject && match) {
      chapterBody.innerHTML = `
        <h3>${match.title}</h3>
        <p class="section-sub">Exercise-style solutions in quick, student-friendly format.</p>
        ${match.qa.map((item, idx) => `
          <article class="card" style="margin-bottom: .8rem;">
            <p><strong>Q${idx + 1}.</strong> ${item.q}</p>
            <div class="answer-box"><strong>Answer:</strong> ${item.a}</div>
          </article>
        `).join("")}
        <article class="card">
          <h4>Extra Study Resources</h4>
          <ul>
            <li><a href="resources.html#notes">Chapter Notes PDF</a></li>
            <li><a href="resources.html#important">Important Questions</a></li>
            <li><a href="resources.html#board">Exam Preparation Plan</a></li>
          </ul>
        </article>
      `;
    } else {
      chapterBody.innerHTML = `
        <article class="card">
          <p>Sample content is currently published for Class 6 English. Full chapter solutions for Class ${classNum} ${subjectName} are being added.</p>
          <p><a href="subject.html?class=${classNum}&subject=${encodeURIComponent(subjectName)}">Back to chapters →</a></p>
        </article>
      `;
    }
  }
})();
