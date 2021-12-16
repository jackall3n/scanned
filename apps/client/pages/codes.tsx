export async function getServerSideProps() {
  const response = await fetch('https://scanned-api.herokuapp.com/api');
  const { codes } = await response.json();

  return {
    props: {
      codes
    }
  }
}

export function Codes({ codes }: any) {
  return (
    <div>
      {codes.map(code => (
        <div key={code.id}>
          {code.id}
        </div>
      ))}
    </div>
  );
}

export default Codes;
