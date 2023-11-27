import "./RunBox.css"

function RunBox ({ run: { text, author }}) {
  const { username } = author;
  return (
    <div className="run">
      <h3>{username}</h3>
      <p>{text}</p>
    </div>
  );
}

export default RunBox;
