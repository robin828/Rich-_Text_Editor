import { useSlateStatic } from 'slate-react';


const main = () => {
  const editor = useSlateStatic()

  const handleInsertImage = () => {
    const url = prompt("Enter an Image URL"); // For simplicity
    insertImage(editor, url); // will be implemented later
  };

  const handleInsertLink = () => {
    const url = prompt("Enter a URL"); // For simplicity
    insertLink(editor, url); // will be implemented later
  };

  return (
    <div className="toolbar">
      <button onClick={handleInsertImage}>Image</button>
      <button onClick={handleInsertLink}>Link</button>
    </div>
  )
}

export default main;