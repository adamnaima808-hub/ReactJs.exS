import { useState, useEffect } from 'react';
import { User, Mail, Briefcase, Award, CheckSquare, ShieldCheck, Bell, Loader2, RefreshCw } from 'lucide-react';

const DeveloperApplicationForm = () => {
  // 1. Initialize state with localStorage persistence (Bonus #1)
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem('dev_application_form');
    return savedData ? JSON.parse(savedData) : {
      fullName: "",
      email: "",
      role: "",
      experience: "",
      skills: [],
      agreeToTerms: false,
      notifications: false
    };
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Bonus #3: Loading state
  const [showModal, setShowModal] = useState(false); // Bonus #2: Success modal

  const roles = [
    "Frontend Developer", 
    "Backend Developer", 
    "Full Stack Developer", 
    "UI/UX Designer", 
    "Product Manager"
  ];
  
  const skillOptions = [
    "React", "JavaScript", "TypeScript", "Node.js", 
    "Python", "Java", "UI Design", "API Development"
  ];

  // Save form data to localStorage whenever it changes (Bonus #1)
  useEffect(() => {
    localStorage.setItem('dev_application_form', JSON.stringify(formData));
  }, [formData]);

  // Separate validation logic
  const validateField = (name, value) => {
    let error = "";
    if (name === 'fullName') {
      if (!value.trim()) {
        error = "Full name is required";
      } else if (!/^[a-zA-Z\s]{2,30}$/.test(value)) {
        error = "Please enter a valid name (2-30 characters, letters only)";
      }
    }
    if (name === 'email') {
      if (!value) {
        error = "Email is required";
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        error = "Please enter a valid email address";
      }
    }
    if (name === 'role') {
      if (!value) {
        error = "Please select a role";
      }
    }
    if (name === 'experience') {
      if (value === "" || value === null) {
        error = "Experience is required";
      } else if (isNaN(value) || Number(value) < 0 || Number(value) > 50) {
        error = "Please enter valid years of experience (0-50)";
      }
    }
    if (name === 'skills') {
      if (!value || value.length === 0) {
        error = "Please select at least one skill";
      }
    }
    if (name === 'agreeToTerms') {
      if (!value) {
        error = "You must agree to the terms";
      }
    }
    return error;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    
    setFormData(prev => ({ ...prev, [name]: newValue }));
    
    // Real-time validation
    const error = validateField(name, newValue);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSkillChange = (skill) => {
    const newSkills = formData.skills.includes(skill)
      ? formData.skills.filter(s => s !== skill)
      : [...formData.skills, skill];
      
    setFormData(prev => ({ ...prev, skills: newSkills }));
    
    const error = validateField('skills', newSkills);
    setErrors(prev => ({ ...prev, skills: error }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate all fields before submission
    const formErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) {
        formErrors[key] = error;
      }
    });

    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      
      // Simulate API call / loading state (Bonus #3)
      setTimeout(() => {
        setIsSubmitting(false);
        setShowModal(true); // Show success modal (Bonus #2)
      }, 1500);
    } else {
      setErrors(formErrors);
    }
  };

  // Form Reset functionality (Bonus #5)
  const handleReset = () => {
    const resetData = {
      fullName: "",
      email: "",
      role: "",
      experience: "",
      skills: [],
      agreeToTerms: false,
      notifications: false
    };
    setFormData(resetData);
    setErrors({});
    localStorage.removeItem('dev_application_form');
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-12 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-8 ring-1 ring-zinc-900/5">
        
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-semibold text-zinc-900">Developer Application Form</h2>
          <button 
            type="button" 
            onClick={handleReset}
            className="text-zinc-400 hover:text-zinc-600 transition"
            title="Reset Form"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Full Name Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">Full Name</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <User className="w-4 h-4" />
              </span>
              <input 
                type="text" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                placeholder="Enter your full name"
                className={`block w-full rounded-lg border pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.fullName 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50/30' 
                    : formData.fullName && !errors.fullName
                    ? 'border-emerald-300 focus:ring-emerald-500 bg-emerald-50/10'
                    : 'border-zinc-300 focus:ring-blue-500'
                }`} 
              />
            </div>
            {errors.fullName && <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>}
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">Email</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Mail className="w-4 h-4" />
              </span>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="Enter your email"
                className={`block w-full rounded-lg border pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.email 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50/30' 
                    : formData.email && !errors.email
                    ? 'border-emerald-300 focus:ring-emerald-500 bg-emerald-50/10'
                    : 'border-zinc-300 focus:ring-blue-500'
                }`} 
              />
            </div>
            {errors.email && <p className="mt-2 text-sm text-red-600">{errors.email}</p>}
          </div>

          {/* Role Select */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">Role</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Briefcase className="w-4 h-4" />
              </span>
              <select 
                name="role" 
                value={formData.role} 
                onChange={handleChange} 
                className={`block w-full rounded-lg border pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.role 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50/30' 
                    : formData.role && !errors.role
                    ? 'border-emerald-300 focus:ring-emerald-500 bg-emerald-50/10'
                    : 'border-zinc-300 focus:ring-blue-500'
                }`}
              >
                <option value="">Select a role</option>
                {roles.map(role => (
                  <option key={role} value={role}>{role}</option>
                ))}
              </select>
            </div>
            {errors.role && <p className="mt-2 text-sm text-red-600">{errors.role}</p>}
          </div>

          {/* Experience Input */}
          <div>
            <label className="block text-sm font-medium text-zinc-700">Years of Experience</label>
            <div className="relative mt-1">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-400">
                <Award className="w-4 h-4" />
              </span>
              <input 
                type="number" 
                name="experience" 
                value={formData.experience} 
                onChange={handleChange} 
                min="0" 
                max="50" 
                placeholder="3"
                className={`block w-full rounded-lg border pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 transition ${
                  errors.experience 
                    ? 'border-red-300 focus:ring-red-500 bg-red-50/30' 
                    : formData.experience !== "" && !errors.experience
                    ? 'border-emerald-300 focus:ring-emerald-500 bg-emerald-50/10'
                    : 'border-zinc-300 focus:ring-blue-500'
                }`} 
              />
            </div>
            {errors.experience && <p className="mt-2 text-sm text-red-600">{errors.experience}</p>}
          </div>

          {/* Skills Checkboxes */}
          <div>
            <label className="block text-sm font-medium text-zinc-700 mb-2 flex items-center gap-2">
              <CheckSquare className="w-4 h-4 text-zinc-400" /> Skills
            </label>
            <div className="grid grid-cols-2 gap-3 bg-zinc-50 p-3 rounded-lg border border-zinc-200">
              {skillOptions.map(skill => (
                <label key={skill} className="flex items-center space-x-2 cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={formData.skills.includes(skill)} 
                    onChange={() => handleSkillChange(skill)} 
                    className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" 
                  />
                  <span className="text-sm text-zinc-600">{skill}</span>
                </label>
              ))}
            </div>
            {errors.skills && <p className="mt-2 text-sm text-red-600">{errors.skills}</p>}
          </div>

          {/* Terms Checkbox */}
          <div>
            <div className="flex items-center space-x-2">
              <input 
                type="checkbox" 
                name="agreeToTerms" 
                checked={formData.agreeToTerms} 
                onChange={handleChange} 
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" 
              />
              <label className="text-sm text-zinc-700 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-zinc-400" /> I agree to the terms and conditions
              </label>
            </div>
            {errors.agreeToTerms && <p className="mt-2 text-sm text-red-600">{errors.agreeToTerms}</p>}
          </div>

          {/* Notifications Checkbox */}
          <div className="flex items-center space-x-2">
            <input 
              type="checkbox" 
              name="notifications" 
              checked={formData.notifications} 
              onChange={handleChange} 
              className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500" 
            />
            <label className="text-sm text-zinc-700 flex items-center gap-1.5">
              <Bell className="w-4 h-4 text-zinc-400" /> Receive notifications about new opportunities
            </label>
          </div>

          {/* Submit Button with Loading State (Bonus #3) */}
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full flex justify-center items-center rounded-lg bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-rose-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 transition disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Submitting...
              </>
            ) : (
              "Submit Application"
            )}
          </button>
        </form>
      </div>

      {/* Success Message Modal (Bonus #2) */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-in fade-in zoom-in duration-200">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-zinc-900 mb-2">Application Submitted!</h3>
            <p className="text-sm text-zinc-600 mb-6">
              Thank you, {formData.fullName}. We have received your application for the {formData.role} position.
            </p>
            <button 
              onClick={() => {
                setShowModal(false);
                handleReset();
              }}
              className="w-full bg-zinc-900 text-white rounded-lg py-2 text-sm font-semibold hover:bg-zinc-800 transition"
            >
              Close & Reset
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeveloperApplicationForm;