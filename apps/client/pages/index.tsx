import useSWR, { SWRConfig } from 'swr'

async function getState() {
  const response = await fetch('https://scanned-api.herokuapp.com/api');
  return await response.json();
}

export async function getServerSideProps() {
  const json = await getState();

  return {
    props: {
      fallback: {
        '/api': json
      }
    }
  }
}

function Home() {
  const { data } = useSWR('/api', getState, {
    refreshInterval: 5000
  });

  const assets = data?.assets ?? [];
  const codes = data?.codes ?? [];

  return (
    <div>
      <div className="flex flex-col justify-center items-center p-4">
        <div className="grid gap-4 grid-flow-col bg-white p-3 rounded-lg shadow-lg">
          <div className="flex flex-col justify-center items-center">
            <div>Active Assets</div>
            <div className="text-4xl">
              {assets.filter(r => r.codeId).length} / {assets.length}
            </div>
          </div>
          <div className="flex flex-col justify-center items-center">
            <div>Active Codes</div>
            <div className="text-4xl">
              {codes.filter(c => c.asset).length} / {codes.length}
            </div>
          </div>
        </div>

      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="grid p-4 rounded-lg shadow-lg gap-2 bg-white">
          <div className="grid grid-cols-5 gap-2 font-medium text-sm">
            <div>
              Reference
            </div>
            <div>
              Description
            </div>
            <div className="text-center">
              Views
            </div>
            <div className="text-center">
              Type
            </div>
            <div className="text-center">
              Status
            </div>
          </div>

          {assets.map(asset => (
            <div key={asset.id} className="grid grid-cols-5 gap-3">
              <div>
                {asset.reference}
              </div>
              <div>
                {asset.description}
              </div>
              <div className="text-center">
                {asset.views}
              </div>
              <div className="text-center">
                <div className="text-sm">
                  {asset.links.length === 1 ? 'LINK' : 'MULTI LINK'}
                </div>
              </div>
              <div className="text-center">
                <div className="text-sm">
                  {asset.codeId && 'ACTIVE'}
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default function Page({ fallback }) {
  return (
    <SWRConfig value={{ fallback }}>
      <Home />
    </SWRConfig>
  )
}
