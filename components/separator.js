export default function Separator(props) {
  return (
    <>
      <div className="separator"></div>
      <style jsx>
        {`
          .separator {
            height: 1px;
            width: 100%;
            background: #ededed;
          }
        `}
      </style>
    </>
  );
}
