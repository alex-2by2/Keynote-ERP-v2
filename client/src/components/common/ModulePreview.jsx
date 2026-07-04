// client/src/components/common/ModulePreview.jsx

export default function ModulePreview({
  title,
  description,
  modules = []
}) {
  return (
    <div className="page">
      <h1>{title}</h1>

      <p>{description}</p>

      {modules.length > 0 && (
        <div className="module-preview">
          <p className="module-preview-label">
            Coming to this section
          </p>

          <ul>
            {modules.map(item => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
