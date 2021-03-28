export default {
  minHeight: '200px',
  language: 'en-US',
  useCommandShortcut: true,
  useDefaultHTMLSanitizer: true,
  usageStatistics: true,
  hideModeSwitch: false,
  toolbarItems: [
    'heading',
    'bold',
    'italic',
    'strike',
    'divider',
    'hr',
    'quote',
    'divider',
    'ul',
    'ol',
    'task',
    'indent',
    'outdent',
    'divider',
    'table',
    'image',
    'link',
    'divider',
    'code',
    'codeblock',
    {
      type: 'button',
      options: {
        el: createLastButton(),
        // event: function() { alert(123) },
        tooltip: 'Custom Button'
      }
    }
  ]
}

function createLastButton() {
  const button = document.createElement('button')

  button.className = 'last'
  button.innerHTML = `<i style="color: black">F</i>`

  return button
}

