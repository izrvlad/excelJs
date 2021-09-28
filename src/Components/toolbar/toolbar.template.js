export function createToolbar(state) {
  const buttons = [
    {
      name: 'format_align_left',
      active: state.textAlign === 'left',
      options: {
        textAlign: 'left'
      }
    },
    {
      name: 'format_align_center',
      active: state.textAlign === 'center',
      options: {
        textAlign: state.textAlign === 'center' ? 'left' : 'center'
      }
    },
    {
      name: 'format_align_right',
      active: state.textAlign === 'right',
      options: {
        textAlign: state.textAlign === 'right' ? 'left' : 'right'
      }
    },
    {
      name: 'format_bold',
      active: state.fontWeight === 'bold',
      options: {
        fontWeight: state.fontWeight === 'bold' ? 'normal' : 'bold'
      }
    },
    {
      name: 'format_italic',
      active: state.fontStyle === 'italic',
      options: {
        fontStyle: state.fontStyle === 'italic' ? 'normal' : 'italic'
      }
    },
    {
      name: 'format_underlined',
      active: state.textDecoration === 'underline',
      options: {
        textDecoration: state.textDecoration === 'underline' ? 'none' : 'underline',
      }
    },
  ];
  return buttons.map(toButton).join('')
}

function toButton(button) {
  const meta = `data-type="button" data-style='${JSON.stringify(button.options)}'`
  return `<span
         ${meta}
         class="material-icons 
         ${button.active ? 'active' : ''}"
         >${button.name}</span>`
}
