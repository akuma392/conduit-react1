import './loader.css';

function FullPageSpinner() {
  return (
    <div className="bouncing-loader" style={{ height: '100vh' }}>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default FullPageSpinner;
