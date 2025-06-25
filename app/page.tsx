import InfluencerDashboard from "../dashboard"

export default function Page() {
  return (
    <div>
      <div style={{padding: '20px', background: 'red', color: 'white', textAlign: 'center'}}>
        🚨 DEPLOYMENT TEST - If you see this red banner, the deployment is working! 🚨
      </div>
      <InfluencerDashboard />
    </div>
  )
}
