import { FaRegUser } from "react-icons/fa";
import { FaHandshake } from "react-icons/fa";
import { FaLightbulb } from "react-icons/fa";

export default function HomepageCTAs() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
      {/* Feature 1 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FaRegUser className="w-8 h-8 text-blue-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          Build Your Profile
        </h3>
        <p className="text-gray-600">
          Create an account with just a couple of clicks and select your
          industry of expertise.
        </p>
      </div>

      {/* Feature 2 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FaHandshake className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">Get Endorsed</h3>
        <p className="text-gray-600">
          Share your profile and receive skill endorsements from colleagues and
          peers to validate your expertise and build credibility.
        </p>
      </div>

      {/* Feature 3 */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
        <div className="w-16 h-16 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-6">
          <FaLightbulb className="w-8 h-8 text-purple-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-3">
          Understand your skills
        </h3>
        <p className="text-gray-600">
          Get a better picture of your strengths and areas of growth. Compare
          your skills with others in your industry.
        </p>
      </div>
    </div>
  );
}
