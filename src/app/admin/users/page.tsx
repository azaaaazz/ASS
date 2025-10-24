/**
 * صفحة إدارة المستخدمين - لوحة الإدارة | منصة خطى التعليمية
 * تتيح للمدير إدارة جميع المستخدمين في المنصة مع صلاحيات شاملة
 */

'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Eye,
  UserPlus,
  Mail,
  Phone,
  Building,
  Calendar,
  Shield,
  CheckCircle,
  XCircle,
  MoreVertical,
  Download,
  Upload,
  Link,
  Key,
  Send,
  Globe,
} from 'lucide-react';
interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'student' | 'company' | 'admin';
  companyName?: string;
  status: 'active' | 'inactive' | 'suspended';
  storageUsed: number; // MB
  storageLimit: number; // MB
  coursesEnrolled: number;
  coursesCompleted: number;
  joinDate: string;
  lastLogin: string;
  customUrl?: string;
  whatsappLink?: string;
  isPremium?: boolean;
  companyLogo?: string;
}

export default function AdminUsersPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // بيانات تجريبية للمستخدمين
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'أحمد محمد',
      email: 'ahmed@example.com',
      phone: '+966501234567',
      userType: 'student',
      status: 'active',
      storageUsed: 1200,
      storageLimit: 5120, // 5GB
      coursesEnrolled: 3,
      coursesCompleted: 2,
      joinDate: '2024-01-15',
      lastLogin: '2024-01-20',
      customUrl: 'ahmed.audit-sa.com',
      whatsappLink: 'https://wa.me/966501234567',
      isPremium: false
    },
    {
      id: '2',
      name: 'شركة الرياض للمحاسبة',
      email: 'info@riyadh-accounting.com',
      phone: '+966112345678',
      userType: 'company',
      companyName: 'شركة الرياض للمحاسبة',
      status: 'active',
      storageUsed: 8500,
      storageLimit: 20480, // 20GB
      coursesEnrolled: 8,
      coursesCompleted: 5,
      joinDate: '2024-01-10',
      lastLogin: '2024-01-19',
      customUrl: 'riyadh-accounting.audit-sa.com',
      whatsappLink: 'https://wa.me/966112345678',
      isPremium: true,
      companyLogo: '/logos/riyadh-accounting.png'
    },
    {
      id: '3',
      name: 'سارة أحمد',
      email: 'sara@example.com',
      phone: '+966507654321',
      userType: 'admin',
      status: 'active',
      storageUsed: 2560,
      storageLimit: 10240, // 10GB
      coursesEnrolled: 15,
      coursesCompleted: 12,
      joinDate: '2023-12-01',
      lastLogin: '2024-01-20',
      isPremium: true
    }
  ]);

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           user.phone.includes(searchTerm);

      const matchesType = userTypeFilter === 'all' || user.userType === userTypeFilter;
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    });
  }, [users, searchTerm, userTypeFilter, statusFilter]);

  const stats = useMemo(() => {
    const total = users.length;
    const students = users.filter(u => u.userType === 'student').length;
    const companies = users.filter(u => u.userType === 'company').length;
    const admins = users.filter(u => u.userType === 'admin').length;
    const active = users.filter(u => u.status === 'active').length;
    const premium = users.filter(u => u.isPremium).length;
    const totalStorage = users.reduce((sum, u) => sum + u.storageUsed, 0);

    return { total, students, companies, admins, active, premium, totalStorage };
  }, [users]);

  const getUserTypeLabel = (type: string) => {
    switch (type) {
      case 'student': return 'متدرب فردي';
      case 'company': return 'شركة/مؤسسة';
      case 'admin': return 'مدير نظام';
      default: return type;
    }
  };

  const getUserTypeColor = (type: string) => {
    switch (type) {
      case 'student': return 'bg-blue-100 text-blue-800';
      case 'company': return 'bg-purple-100 text-purple-800';
      case 'admin': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-yellow-100 text-yellow-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCreateCustomUrl = (user: User) => {
    const customUrl = `${user.name.toLowerCase().replace(/\s+/g, '-')}.audit-sa.com`;
    setUsers(users.map(u => u.id === user.id ? { ...u, customUrl } : u));
    alert(`تم إنشاء الرابط المخصص: ${customUrl}`);
  };

  const handleSendInvitation = (user: User) => {
    alert(`تم إرسال دعوة إلى ${user.email}`);
  };

  const handleSendWhatsappLink = (user: User) => {
    if (user.whatsappLink) {
      window.open(user.whatsappLink, '_blank');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* رأس الصفحة */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 bg-red-100 px-6 py-3 rounded-full mb-6">
            <Shield className="w-6 h-6 text-red-600" />
            <span className="text-red-700 font-bold">إدارة المستخدمين والعملاء</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            نظام إدارة المستخدمين الشامل
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            إدارة شاملة للمستخدمين مع صلاحيات متنوعة وإعدادات مخصصة
          </p>
        </motion.div>

        {/* الإحصائيات */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 mb-8"
        >
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي المستخدمين</p>
                <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المتدربين الأفراد</p>
                <p className="text-3xl font-bold text-blue-600">{stats.students}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <UserPlus className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">الشركات</p>
                <p className="text-3xl font-bold text-purple-600">{stats.companies}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <Building className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المديرين</p>
                <p className="text-3xl font-bold text-red-600">{stats.admins}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المستخدمين النشطين</p>
                <p className="text-3xl font-bold text-green-600">{stats.active}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">المشتركين المميزين</p>
                <p className="text-3xl font-bold text-yellow-600">{stats.premium}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <Key className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">إجمالي التخزين</p>
                <p className="text-3xl font-bold text-indigo-600">{(stats.totalStorage / 1024).toFixed(1)} GB</p>
              </div>
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <Upload className="w-6 h-6 text-indigo-600" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* شريط التحكم */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-100"
        >
          <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
            {/* شريط البحث */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="البحث في المستخدمين..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>

            {/* الفلاتر */}
            <div className="flex items-center gap-3">
              <Filter className="w-5 h-5 text-gray-600" />
              <select
                value={userTypeFilter}
                onChange={(e) => setUserTypeFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="all">جميع الأنواع</option>
                <option value="student">متدرب فردي</option>
                <option value="company">شركة/مؤسسة</option>
                <option value="admin">مدير نظام</option>
              </select>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300"
              >
                <option value="all">جميع الحالات</option>
                <option value="active">نشط</option>
                <option value="inactive">غير نشط</option>
                <option value="suspended">معلق</option>
              </select>
            </div>

            {/* أزرار التحكم */}
            <div className="flex items-center gap-3">
              <motion.button
                className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowAddUserModal(true)}
              >
                <UserPlus className="w-5 h-5" />
                إضافة مستخدم جديد
              </motion.button>

              <motion.button
                className="bg-gradient-to-r from-blue-600 to-blue-600 hover:from-blue-700 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Download className="w-5 h-5" />
                تصدير البيانات
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* جدول المستخدمين */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">المستخدم</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">النوع</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الحالة</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">التخزين</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الدورات</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">آخر دخول</th>
                  <th className="px-6 py-4 text-right text-sm font-semibold text-gray-900">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredUsers.map((user, index) => (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-gray-50 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900">{user.name}</div>
                          <div className="text-sm text-gray-600">{user.email}</div>
                          {user.companyName && (
                            <div className="text-sm text-purple-600">{user.companyName}</div>
                          )}
                          {user.customUrl && (
                            <div className="text-xs text-blue-600 flex items-center gap-1">
                              <Globe className="w-3 h-3" />
                              {user.customUrl}
                            </div>
                          )}
                          {user.isPremium && (
                            <div className="text-xs text-yellow-600 flex items-center gap-1">
                              <Key className="w-3 h-3" />
                              مشترك مميز
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getUserTypeColor(user.userType)}`}>
                        {getUserTypeLabel(user.userType)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(user.status)}`}>
                        {user.status === 'active' ? <CheckCircle className="w-3 h-3" /> :
                         user.status === 'inactive' ? <XCircle className="w-3 h-3" /> :
                         <XCircle className="w-3 h-3" />}
                        {user.status === 'active' ? 'نشط' :
                         user.status === 'inactive' ? 'غير نشط' : 'معلق'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold">{(user.storageUsed / 1024).toFixed(1)} GB</div>
                        <div className="text-gray-600">من {(user.storageLimit / 1024).toFixed(0)} GB</div>
                        <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(user.storageUsed / user.storageLimit) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        <div className="font-semibold">{user.coursesCompleted}/{user.coursesEnrolled}</div>
                        <div className="text-gray-600">مكتمل</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(user.lastLogin).toLocaleDateString('ar-SA')}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <motion.button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setSelectedUser(user)}
                        >
                          <Eye className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleCreateCustomUrl(user)}
                        >
                          <Link className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-purple-600 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSendInvitation(user)}
                        >
                          <Mail className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleSendWhatsappLink(user)}
                        >
                          <Send className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Edit className="w-4 h-4" />
                        </motion.button>
                        <motion.button
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* رسالة عدم وجود نتائج */}
        {filteredUsers.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16 bg-white rounded-2xl shadow-lg border border-gray-100 mt-8"
          >
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">لا توجد نتائج</h3>
            <p className="text-gray-600">لم نتمكن من العثور على أي مستخدمين تطابق معايير البحث الخاصة بك</p>
          </motion.div>
        )}

        {/* نافذة تفاصيل المستخدم */}
        <AnimatePresence>
          {selectedUser && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              >
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-bold text-gray-900">تفاصيل المستخدم</h3>
                    <button
                      onClick={() => setSelectedUser(null)}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-xl">
                      {selectedUser.name.charAt(0)}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900">{selectedUser.name}</h4>
                      <p className="text-gray-600">{selectedUser.email}</p>
                      {selectedUser.companyName && (
                        <p className="text-purple-600">{selectedUser.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">نوع المستخدم</label>
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getUserTypeColor(selectedUser.userType)}`}>
                        {getUserTypeLabel(selectedUser.userType)}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">الحالة</label>
                      <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedUser.status)}`}>
                        {selectedUser.status === 'active' ? 'نشط' :
                         selectedUser.status === 'inactive' ? 'غير نشط' : 'معلق'}
                      </span>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">رقم الهاتف</label>
                      <p className="text-gray-900">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">تاريخ الانضمام</label>
                      <p className="text-gray-900">{new Date(selectedUser.joinDate).toLocaleDateString('ar-SA')}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-blue-900 mb-2">الدورات المسجلة</h5>
                      <p className="text-2xl font-bold text-blue-600">{selectedUser.coursesEnrolled}</p>
                      <p className="text-sm text-blue-700">مكتمل: {selectedUser.coursesCompleted}</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h5 className="font-semibold text-green-900 mb-2">مساحة التخزين</h5>
                      <p className="text-2xl font-bold text-green-600">{(selectedUser.storageUsed / 1024).toFixed(1)} GB</p>
                      <p className="text-sm text-green-700">من {(selectedUser.storageLimit / 1024).toFixed(0)} GB</p>
                    </div>
                  </div>

                  {selectedUser.customUrl && (
                    <div className="bg-purple-50 p-4 rounded-lg mb-4">
                      <h5 className="font-semibold text-purple-900 mb-2">الرابط المخصص</h5>
                      <p className="text-purple-700 break-all">{selectedUser.customUrl}</p>
                    </div>
                  )}

                  <div className="flex gap-3">
                    <motion.button
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      تعديل البيانات
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleSendInvitation(selectedUser)}
                    >
                      إرسال دعوة
                    </motion.button>
                    <motion.button
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setSelectedUser(null)}
                    >
                      إغلاق
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
