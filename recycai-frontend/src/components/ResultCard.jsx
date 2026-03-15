import React from 'react';
import { Recycle, Clock, Lightbulb, Leaf, Truck } from 'lucide-react';

const ResultCard = ({ result, onNavigate }) => {
  if (!result) return null;

  const { wasteType, decompositionTime, recyclingSuggestion } = result;

  return (
    <div className="w-full max-w-lg mx-auto mt-8 animate-fadeIn">
      {/* Main Result Card */}
      <div className="bg-white rounded-3xl border border-green-200 shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-700 to-emerald-600 px-6 sm:px-8 py-6 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
              <Recycle className="w-7 h-7" />
            </div>
            <div>
              <p className="text-green-100 text-xs font-bold uppercase tracking-widest">
                Detected Waste Type
              </p>
              <h3 className="text-2xl font-black mt-0.5">{wasteType}</h3>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8 space-y-5">
          {/* Decomposition Time */}
          <div className="flex items-start space-x-4 p-4 bg-amber-50 rounded-2xl border border-amber-100">
            <div className="w-10 h-10 bg-amber-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Clock className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <p className="text-xs font-black text-amber-700 uppercase tracking-widest">
                Decomposition Time
              </p>
              <p className="text-lg font-bold text-gray-800 mt-1">
                ~{decompositionTime}
              </p>
            </div>
          </div>

          {/* Recycling Suggestion */}
          <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-2xl border border-blue-100">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <p className="text-xs font-black text-blue-700 uppercase tracking-widest">
                Recycling Suggestion
              </p>
              <p className="text-sm text-gray-700 mt-1 leading-relaxed font-medium">
                {recyclingSuggestion}
              </p>
            </div>
          </div>

          {/* Environmental Impact */}
          <div className="flex items-start space-x-4 p-4 bg-emerald-50 rounded-2xl border-l-4 border-emerald-500">
            <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Leaf className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-xs font-black text-emerald-700 uppercase tracking-widest">
                Environmental Impact
              </p>
              <p className="text-sm text-gray-600 mt-1 leading-relaxed">
                Recycling this item saves energy and reduces landfill waste. Every small step helps build a sustainable future.
              </p>
            </div>
          </div>
        </div>

        {/* Request Pickup Button */}
        {onNavigate && (
          <div className="px-6 sm:px-8 pb-6 sm:pb-8">
            <button
              onClick={() => onNavigate('request')}
              className="w-full bg-green-50 hover:bg-green-100 text-green-800 font-bold py-4 rounded-2xl border border-green-200 flex items-center justify-center space-x-2 transition-all"
            >
              <Truck className="w-5 h-5" />
              <span>Request Pickup for This Item</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
