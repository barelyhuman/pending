export default function Input({ children, ...props }) {
  return (
    <>
      <input {...props} />
      <style jsx>{`
        input {
          background: #fff;
          color: #000;
          width: 100%;
          border: 2px solid rgba(12, 12, 13, 0.1);
          border-radius: 4px;
          height: 36px;
          padding: 0 16px;
          display: inline-flex;
          justify-content: center;
          align-items: center;
          transition: all 0.2s ease;
        }

        input:hover,
        input:focus {
          border-color: #000;
          outline: #000;
        }
      `}</style>
    </>
  );
}
