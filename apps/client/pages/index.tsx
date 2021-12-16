export async function getServerSideProps() {
  const response = await fetch('https://scanned-api.herokuapp.com/api');
  const json = await response.json();

  return {
    props: {
      ...json
    }
  }
}

export function Index({ assets }: any) {
  return (
    <div>
      <div className="flex flex-col justify-center items-center py-2">
        <div className="grid">
          <div className="grid grid-cols-3 gap-2">
            <div>
              ID
            </div>
            <div>
              Views
            </div>
            <div>
              Code
            </div>
          </div>

          {assets.map(asset => (
            <div key={asset.id} className="grid  grid-cols-3 gap-2">
              <div>
                {asset.id}
              </div>
              <div>
                {asset.views}
              </div>
              <div>
                {asset.codeId}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default Index;
