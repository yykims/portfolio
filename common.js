// 세 페이지가 같이 쓰는 도구
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

const isTodo = (v) => v == null || v === "" || (v && v.todo);

// 글 칸 출력: TODO → '작성 예정' + 안내 / DRAFT → '확인 필요' + 초안 글 / 글 → 그대로
const txt = (v) => {
  if (v == null || v === "") return "";
  if (v.todo) return `<span class="todo">${esc(v.hint)}</span>`;
  if (v.draft) return `<span class="draft">${esc(v.text)}</span>`;
  return esc(v);
};

// 줄바꿈(\n)을 <br>로
const br = (v) => txt(v).replace(/\n/g, "<br>");

const chapterNo = (i) => `제${i + 1}장`;
// 보이는 프로젝트만 (hidden: true 는 빼고)
const SHOWN = PROJECTS.filter((p) => !p.hidden);
const projectsOf = (year) => SHOWN.filter((p) => p.year === year);
// 페이지를 고칠 때마다 BUILD를 올리면, 브라우저가 예전 페이지를 기억해 두고 보여 주는 일이 없다
const BUILD = "36";
const asset = (src) => /^https?:/.test(src) ? src : `${src}?v=${BUILD}`;
const projectUrl = (p) => `project.html?id=${encodeURIComponent(p.id)}&v=${BUILD}`;

const nav = (here) => `
  <nav class="nav"><div class="wrap">
    <a class="logo" href="index.html?v=${BUILD}">${esc(SITE.name)}${SITE.role ? `<span>${esc(SITE.role)}</span>` : ""}</a>
    <div class="links">
      <a href="index.html?v=${BUILD}" class="${here === "story" ? "on" : ""}">연대기</a>
      <a href="projects.html?v=${BUILD}" class="${here === "projects" ? "on" : ""}">프로젝트</a>
      <a href="now.html?v=${BUILD}" class="${here === "now" ? "on" : ""}">질문</a>
    </div>
  </div></nav>`;

// 연락하기는 지금 판에서 뺐다 (예전 판: 이메일 · 이력서 · 링크 목록). 다시 넣을 땐 git 기록에서 가져온다.
const footer = () => `
  <footer><div class="wrap">
    <small>© ${esc(SITE.name)}</small>
  </div></footer>`;
