import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { Eye, EyeOff } from 'lucide-react';

const PasswordStrengthIndicator = ({ password, t }) => {
  const calculateStrength = (pwd) => {
    let strength = 0;
    if (pwd.length >= 8) strength++;
    if (/[A-Z]/.test(pwd)) strength++;
    if (/[a-z]/.test(pwd)) strength++;
    if (/[0-9]/.test(pwd)) strength++;
    if (/[!@#$%^&*]/.test(pwd)) strength++;
    return strength;
  };

  const strength = calculateStrength(password);
  const widthPercentage = (strength / 5) * 100;
  
  const getColor = () => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    if (strength <= 4) return 'bg-blue-500';
    return 'bg-green-500';
  };

  return (
    <div className="mt-2">
      <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <div 
          className={`h-full ${getColor()} transition-all duration-300`} 
          style={{ width: `${widthPercentage}%` }}
        />
      </div>
      <span className="text-sm mt-1 text-gray-600">
        {t('setPassword.strength.label')}: {' '}
        {strength === 5 
          ? t('setPassword.strength.strong') 
          : strength >= 3 
            ? t('setPassword.strength.moderate') 
            : t('setPassword.strength.weak')}
      </span>
    </div>
  );
};

const PasswordRequirement = ({ met, text }) => (
  <div className="flex items-center gap-2 text-sm">
    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
      met ? 'bg-green-500' : 'bg-gray-300'
    }`}>
      {met && <span className="text-white text-xs">✓</span>}
    </div>
    <span className={met ? 'text-green-700' : 'text-gray-600'}>{text}</span>
  </div>
);

const debugLog = (message, data) => {
  console.log(`[Debug] ${message}:`, data);
};

export default function SetPasswordPage() {
  const { darkMode } = useTheme();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [lockDuration, setLockDuration] = useState(0);

  useEffect(() => {
    let interval;
    if (isLocked && lockDuration > 0) {
      interval = setInterval(() => {
        setLockDuration((prev) => {
          if (prev <= 1) {
            setIsLocked(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isLocked, lockDuration]);

  const requirements = {
    length: formData.newPassword.length >= 8,
    uppercase: /[A-Z]/.test(formData.newPassword),
    lowercase: /[a-z]/.test(formData.newPassword),
    number: /[0-9]/.test(formData.newPassword),
    special: /[!@#$%^&*]/.test(formData.newPassword),
    match: formData.newPassword === formData.confirmPassword
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isLocked) return;
  
    if (attempts >= 3) {
      setIsLocked(true);
      setLockDuration(30);
      setError('Too many attempts. Please try again in 30 seconds.');
      return;
    }
  
    setLoading(true);
    setError('');
    
    try {
      const userId = localStorage.getItem('loggedInUserId');
      debugLog('Retrieved userId', userId);
  
      if (!userId) {
        throw new Error('Please log in again');
      }
  
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      debugLog('All users:', users);
  
      const user = users.find(u => {
        const storedId = String(u.userid);
        const providedId = String(userId);
        debugLog('Comparing user IDs', { storedId, providedId, matched: storedId === providedId });
        return storedId === providedId;
      });
  
      debugLog('Found user:', user);
      debugLog('Current password provided:', formData.currentPassword);
      debugLog('Stored password:', user?.password);
      debugLog('Do passwords match?', formData.currentPassword === user?.password);
  
      if (!user) {
        throw new Error('User not found. Please log in again.');
      }
  
      const currentPasswordTrimmed = formData.currentPassword.trim();
      const storedPasswordTrimmed = user.password.trim();
  
      if (currentPasswordTrimmed !== storedPasswordTrimmed) {
        debugLog('Password mismatch details', {
          provided: currentPasswordTrimmed,
          stored: storedPasswordTrimmed,
          length: {
            provided: currentPasswordTrimmed.length,
            stored: storedPasswordTrimmed.length
          }
        });
        setAttempts(prev => prev + 1);
        throw new Error('Current password is incorrect');
      }
  
      if (!Object.values(requirements).every(Boolean)) {
        throw new Error('Please meet all password requirements');
      }
  
      const updatedUsers = users.map(u => 
        String(u.userid) === String(userId) 
          ? { ...u, password: formData.newPassword }
          : u
      );
      
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      setSuccess('Password updated successfully!');
      
      setTimeout(() => navigate('/settings'), 2000);
      
    } catch (err) {
      console.error('Password update error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const baseInputClass = `w-full px-4 py-2 rounded-lg border ${
    darkMode 
      ? 'bg-gray-800 border-gray-700 text-white' 
      : 'bg-white border-gray-300 text-gray-900'
  } focus:outline-none focus:ring-2 focus:ring-blue-500`;

  return (
    <div className={`max-w-md mx-auto mt-8 p-6 rounded-xl shadow-lg ${
      darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'
    }`}>
      <h1 className="text-2xl font-bold mb-6">{t('setPassword.title')}</h1>
      
      {error && (
        <div className="mb-4 p-3 rounded bg-red-100 text-red-700" role="alert">
          {t(`setPassword.errorMessages.${
            error === 'Current password is incorrect' ? 'incorrect' :
            error === 'Please meet all password requirements' ? 'requirements' :
            error === 'Please log in again' ? 'loginAgain' : 'error'
          }`)}
        </div>
      )}
      
      {success && (
        <div className="mb-4 p-3 rounded bg-green-100 text-green-700" role="alert">
          {t('setPassword.success')}
        </div>
      )}
  
      {isLocked && (
        <div className="mb-4 p-3 rounded bg-yellow-100 text-yellow-700">
          {t('setPassword.locked').replace('{{seconds}}', lockDuration)}
        </div>
      )}
  
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">
            {t('setPassword.currentPassword')}
          </label>
          <div className="relative">
            <input
              type={showCurrentPassword ? 'text' : 'password'}
              value={formData.currentPassword}
              onChange={(e) => handleInputChange('currentPassword', e.target.value)}
              className={baseInputClass}
              disabled={isLocked}
              required
              aria-label={t('setPassword.currentPassword')}
            />
            <button
              type="button"
              onClick={() => setShowCurrentPassword(!showCurrentPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label={showCurrentPassword ? t('setPassword.hidePassword') : t('setPassword.showPassword')}
            >
              {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
  
        <div>
  <label className="block mb-2 text-sm font-medium">
    {t('setPassword.newPassword')}
  </label>
  <div className="relative">
    <input
      type={showNewPassword ? 'text' : 'password'}
      value={formData.newPassword}
      onChange={(e) => handleInputChange('newPassword', e.target.value)}
      className={baseInputClass}
      disabled={isLocked}
      required
      aria-label={t('setPassword.newPassword')}
    />
    <button
      type="button"
      onClick={() => setShowNewPassword(!showNewPassword)}
      className="absolute right-3 top-1/2 -translate-y-1/2"
      aria-label={showNewPassword ? t('setPassword.hidePassword') : t('setPassword.showPassword')}
    >
      {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
    </button>
  </div>
  <PasswordStrengthIndicator password={formData.newPassword} t={t} />
</div>
  
        <div>
          <label className="block mb-2 text-sm font-medium">
            {t('setPassword.confirmPassword')}
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              value={formData.confirmPassword}
              onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
              className={baseInputClass}
              disabled={isLocked}
              required
              aria-label={t('setPassword.confirmPassword')}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
              aria-label={showConfirmPassword ? t('setPassword.hidePassword') : t('setPassword.showPassword')}
            >
              {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>
  
        <div className="space-y-2 p-4 rounded-lg bg-gray-50 dark:bg-gray-800">
          <h3 className="font-medium mb-2">{t('setPassword.requirements.title')}:</h3>
          <PasswordRequirement met={requirements.length} text={t('setPassword.requirements.length')} />
          <PasswordRequirement met={requirements.uppercase} text={t('setPassword.requirements.uppercase')} />
          <PasswordRequirement met={requirements.lowercase} text={t('setPassword.requirements.lowercase')} />
          <PasswordRequirement met={requirements.number} text={t('setPassword.requirements.number')} />
          <PasswordRequirement met={requirements.special} text={t('setPassword.requirements.special')} />
          <PasswordRequirement met={requirements.match} text={t('setPassword.requirements.match')} />
        </div>
  
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading || isLocked || !Object.values(requirements).every(Boolean)}
            className={`flex-1 py-2 px-4 rounded-lg font-medium ${
              loading || isLocked
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }`}
          >
            {loading ? t('setPassword.updating') : t('setPassword.submit')}
          </button>
          <button
            type="button"
            onClick={() => navigate('/settings')}
            className="flex-1 py-2 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-50"
          >
            {t('setPassword.cancel')}
          </button>
        </div>
      </form>
    </div>
  );
}