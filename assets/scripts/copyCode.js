const codeBlocks = document.querySelectorAll('.code-header + .highlighter-rouge');
const copyCodeButtons = document.querySelectorAll('.copy-code-button');

copyCodeButtons.forEach((copyCodeButton, index) => {
  const code = codeBlocks[index].innerText;

  copyCodeButton.addEventListener('click', () => {
	const classBefore = [`before:content-['Copy']`, `after:content-['📋']`]
	// const classAfter = [`before:content-['Copied']`, `after:content-['✔️']`]
    window.navigator.clipboard.writeText(code);
	copyCodeButton.classList.remove(...classBefore);
	copyCodeButton.innerText += 'Copied ✔️'
    // copyCodeButton.classList.add(...classAfter);
    setTimeout(() => {
		// copyCodeButton.classList.remove(...classAfter);
		copyCodeButton.textContent = ''
		copyCodeButton.classList.add(...classBefore);
    }, 2000);
  });
});