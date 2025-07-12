'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  UserIcon, 
  MapPinIcon, 
  ClockIcon, 
  EyeIcon,
  EyeSlashIcon,
  PencilIcon,
  CheckIcon,
  XMarkIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

// Mock current user data
const initialUserData = {
  id: 'current-user',
  name: 'Alex Johnson',
  location: 'San Francisco, CA',
  profilePhoto: null,
  skillsOffered: ['JavaScript', 'React', 'Node.js'],
  skillsWanted: ['Python', 'Machine Learning'],
  availability: 'Weekends',
  profileVisibility: 'Public',
  bio: 'Full-stack developer passionate about learning new technologies and sharing knowledge.',
  rating: 4.8,
  completedSwaps: 12
};

export default function ProfilePage() {
  const [userData, setUserData] = useState(initialUserData);
  const [editingField, setEditingField] = useState<string | null>(null);
  const [tempValues, setTempValues] = useState<Record<string, string | string[]>>({});

  const handleEditStart = (field: string) => {
    setEditingField(field);
    const value = userData[field as keyof typeof userData];
    setTempValues({ 
      ...tempValues, 
      [field]: Array.isArray(value) ? value : String(value || '') 
    });
  };

  const handleEditSave = (field: string) => {
    setUserData({ ...userData, [field]: tempValues[field] });
    setEditingField(null);
    setTempValues({ ...tempValues, [field]: '' });
  };

  const handleEditCancel = (field: string) => {
    setEditingField(null);
    setTempValues({ ...tempValues, [field]: '' });
  };

  const handleSkillAdd = (type: 'skillsOffered' | 'skillsWanted', skill: string) => {
    if (skill.trim() && !userData[type].includes(skill.trim())) {
      setUserData({
        ...userData,
        [type]: [...userData[type], skill.trim()]
      });
    }
  };

  const handleSkillRemove = (type: 'skillsOffered' | 'skillsWanted', skillIndex: number) => {
    setUserData({
      ...userData,
      [type]: userData[type].filter((_, index) => index !== skillIndex)
    });
  };

  const toggleProfileVisibility = () => {
    setUserData({
      ...userData,
      profileVisibility: userData.profileVisibility === 'Public' ? 'Private' : 'Public'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100">
      {/* Header */}
      <motion.header 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              href="/home" 
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              ← Back to Home
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">User Profile</h1>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/notifications"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
            >
              Notifications
            </Link>
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <UserIcon className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </motion.header>

      <div className="max-w-4xl mx-auto px-4 py-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden"
        >
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-8 text-white">
            <div className="flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden bg-white/20 flex items-center justify-center">
                  {userData.profilePhoto ? (
                    <Image
                      src={userData.profilePhoto}
                      alt={userData.name}
                      width={96}
                      height={96}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <UserIcon className="w-12 h-12 text-white" />
                  )}
                </div>
                <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white text-purple-600 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
                  <CameraIcon className="w-4 h-4" />
                </button>
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{userData.name}</h2>
                <div className="flex items-center gap-4 text-white/90">
                  <div className="flex items-center gap-1">
                    <MapPinIcon className="w-4 h-4" />
                    <span>{userData.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-300">★</span>
                    <span>{userData.rating}</span>
                  </div>
                  <span>{userData.completedSwaps} swaps completed</span>
                </div>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-8 space-y-8">
            {/* Basic Information */}
            <div className="grid md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <UserIcon className="w-4 h-4" />
                  Name
                </label>
                {editingField === 'name' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempValues.name || ''}
                      onChange={(e) => setTempValues({ ...tempValues, name: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleEditSave('name')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditCancel('name')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">{userData.name}</span>
                    <button
                      onClick={() => handleEditStart('name')}
                      className="p-1 text-gray-500 hover:text-purple-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Location */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <MapPinIcon className="w-4 h-4" />
                  Location
                </label>
                {editingField === 'location' ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={tempValues.location || ''}
                      onChange={(e) => setTempValues({ ...tempValues, location: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => handleEditSave('location')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditCancel('location')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">{userData.location}</span>
                    <button
                      onClick={() => handleEditStart('location')}
                      className="p-1 text-gray-500 hover:text-purple-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Availability */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <ClockIcon className="w-4 h-4" />
                  Availability
                </label>
                {editingField === 'availability' ? (
                  <div className="flex items-center gap-2">
                    <select
                      value={tempValues.availability || ''}
                      onChange={(e) => setTempValues({ ...tempValues, availability: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="Weekdays">Weekdays</option>
                      <option value="Weekends">Weekends</option>
                      <option value="Evenings">Evenings</option>
                      <option value="Flexible">Flexible</option>
                    </select>
                    <button
                      onClick={() => handleEditSave('availability')}
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                    >
                      <CheckIcon className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleEditCancel('availability')}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <XMarkIcon className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-800">{userData.availability}</span>
                    <button
                      onClick={() => handleEditStart('availability')}
                      className="p-1 text-gray-500 hover:text-purple-600"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Profile Visibility */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  {userData.profileVisibility === 'Public' ? (
                    <EyeIcon className="w-4 h-4" />
                  ) : (
                    <EyeSlashIcon className="w-4 h-4" />
                  )}
                  Profile Visibility
                </label>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-gray-800">{userData.profileVisibility}</span>
                  <button
                    onClick={toggleProfileVisibility}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      userData.profileVisibility === 'Public'
                        ? 'bg-green-100 text-green-800 hover:bg-green-200'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    {userData.profileVisibility === 'Public' ? 'Public' : 'Private'}
                  </button>
                </div>
              </div>
            </div>

            {/* Skills Section */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Skills Offered */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  Skills Offered
                  <span className="text-sm text-gray-500">({userData.skillsOffered.length})</span>
                </h3>
                <div className="space-y-2">
                  {userData.skillsOffered.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg"
                    >
                      <span className="text-green-800 font-medium">{skill}</span>
                      <button
                        onClick={() => handleSkillRemove('skillsOffered', index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a skill..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSkillAdd('skillsOffered', (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Skills Wanted */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                  Skills Wanted
                  <span className="text-sm text-gray-500">({userData.skillsWanted.length})</span>
                </h3>
                <div className="space-y-2">
                  {userData.skillsWanted.map((skill, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg"
                    >
                      <span className="text-blue-800 font-medium">{skill}</span>
                      <button
                        onClick={() => handleSkillRemove('skillsWanted', index)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      placeholder="Add a skill..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSkillAdd('skillsWanted', (e.target as HTMLInputElement).value);
                          (e.target as HTMLInputElement).value = '';
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Bio Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Bio</h3>
              {editingField === 'bio' ? (
                <div className="space-y-2">
                  <textarea
                    value={tempValues.bio || ''}
                    onChange={(e) => setTempValues({ ...tempValues, bio: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    rows={4}
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditSave('bio')}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => handleEditCancel('bio')}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-start justify-between">
                    <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                    <button
                      onClick={() => handleEditStart('bio')}
                      className="p-1 text-gray-500 hover:text-purple-600 ml-4"
                    >
                      <PencilIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-center pt-6 border-t border-gray-200">
              <button className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium">
                Save Changes
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
