# Test cases for the Component

## For header component

### Unit test

- the component should renders with correct label and placeholder

## For footer component

### Unit test

- Rendering the footer with active todos.
- Rendering the footer with no todos.
- Testing the behavior of clicking on the "Clear completed" button.

## For main component

### Integration test

- Rendering todos based on the current route
- toggle all todos when "Toggle All" checkbox is clicked
- Does not render "Toggle All" checkbox if no todos are visible

## For input component

### Integration test

- Testing the rendering of input field with provided props
- Testing the behavior of submitting input value on pressing Enter key with valid value
- Testing the behavior of not submitting input value on pressing Enter key with invalid value
- Testing the behavior of triggering onBlur function when input loses focus
- Testing the behavior of sanitizing input value before submitting

## For item component

### Unit test

- Testing the rendering of todo item
- Testing the behavior of toggling completion status
- Testing the behavior of removing todo item
- Testing the behavior of allowing editing
