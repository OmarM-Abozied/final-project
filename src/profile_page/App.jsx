
import SimpleProfilePage from './components/SimpleProfilePage';
import Navbar from '../home_page/components/Navbar';
function Services() {
  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">Our Services</h1>
        <div className="space-y-6">
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Property Sales</h2>
            <p className="text-gray-600">Complete assistance for buying and selling residential and commercial properties.</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Property Management</h2>
            <p className="text-gray-600">Professional management services for rental properties and investments.</p>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold text-blue-900 mb-4">Market Analysis</h2>
            <p className="text-gray-600">Comprehensive market research and property valuation services.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <div>
      {/* <Navbar /> */}
      <SimpleProfilePage />
    </div>
  );
}

export default App;
