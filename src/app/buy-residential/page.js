import BuyResidentialsPage from '@/template/BuyResidentialsPage'

const BuyResidential = async ({searchParams}) => {
  const res = await fetch("http://localhost:3000/api/profile" , {cache : "no-store"})
  const data = await res.json()
  if(data.error) return <h3>مشکلی در سایت پیش آمده</h3>
  let finalData = data.data
  if(searchParams?.category){
    finalData = finalData?.filter(e => (e.category === searchParams?.category))
  }
  return (
    <BuyResidentialsPage data={finalData} />
  )
}

export default BuyResidential