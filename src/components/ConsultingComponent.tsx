'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import {
  Calendar,
  Clock,
  User,
  FileText,
  Upload,
  MessageSquare,
  Plus,
  CheckCircle,
} from 'lucide-react';

/**
 * Represents a consultation session with expert including scheduling, status, files, and comments
 */
interface ConsultationSession {
  id: string;
  title: string;
  expert: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  files?: File[];
  comments?: string[];
}

interface SessionRowProps {
  session: ConsultationSession;
  onViewDetails: (session: ConsultationSession) => void;
}

/**
 * Table row displaying consultation session information with status badge and view details action.
 */
const SessionRow: React.FC<SessionRowProps> = ({ session, onViewDetails }) => (
  <tr className="hover:bg-gray-50 dark:hover:bg-gray-700">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <FileText className="w-5 h-5 text-primary ml-2" />
        <span className="text-sm font-medium text-gray-900 dark:text-white">
          {session.title}
        </span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex items-center">
        <User className="w-5 h-5 text-gray-400 ml-2" />
        <span className="text-sm text-gray-500 dark:text-gray-300">
          {session.expert}
        </span>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="flex flex-col text-sm text-gray-500 dark:text-gray-300">
        <div className="flex items-center mb-1">
          <Calendar className="w-4 h-4 ml-1" />
          {session.date}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 ml-1" />
          {session.time}
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span
        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
          session.status === 'scheduled'
            ? 'bg-yellow-100 text-yellow-800'
            : session.status === 'completed'
              ? 'bg-green-100 text-green-800'
              : 'bg-red-100 text-red-800'
        }`}
      >
        {session.status === 'scheduled'
          ? 'محجوز'
          : session.status === 'completed'
            ? 'مكتمل'
            : 'ملغي'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
      <button
        onClick={() => onViewDetails(session)}
        className="text-primary hover:text-primary/80"
      >
        عرض التفاصيل
      </button>
    </td>
  </tr>
);

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

/**
 * Modal form for booking new consultation sessions. Includes fields for topic, expert selection, date, and time.
 */
const BookingFormModal: React.FC<BookingFormModalProps> = ({ isOpen, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-md w-full mx-4"
      >
        <h3 className="text-xl font-bold mb-4">حجز جلسة استشارية</h3>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              الموضوع
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="اكتب موضوع الاستشارة"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الخبير</label>
            <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
              <option>د. أحمد محمد</option>
              <option>د. فاطمة علي</option>
              <option>د. محمد حسن</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">
              التاريخ
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">الوقت</label>
            <input
              type="time"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
            >
              حجز الجلسة
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 border border-gray-300 py-2 px-4 rounded-md hover:bg-gray-50"
            >
              إلغاء
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

interface SessionDetailsModalProps {
  session: ConsultationSession | null;
  onClose: () => void;
  onFileUpload: (sessionId: string, file: File) => void;
  onAddComment: (sessionId: string, comment: string) => void;
}

/**
 * Modal displaying detailed consultation session information with file upload and commenting functionality.
 */
const SessionDetailsModal: React.FC<SessionDetailsModalProps> = ({ session, onClose, onFileUpload, onAddComment }) => {
  if (!session) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        className="bg-white dark:bg-gray-800 p-8 rounded-lg max-w-2xl w-full mx-4 max-h-96 overflow-y-auto"
      >
        <h3 className="text-xl font-bold mb-4">{session.title}</h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">الخبير</p>
              <p className="font-medium">{session.expert}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">التاريخ والوقت</p>
              <p className="font-medium">
                {session.date} - {session.time}
              </p>
            </div>
          </div>

          {/* Files Section */}
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <FileText className="w-5 h-5 ml-2" />
              الملفات المرفوعة
            </h4>
            <div className="space-y-2">
              {session.files?.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between bg-gray-50 p-2 rounded"
                >
                  <span className="text-sm">{file.name}</span>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
              ))}
              <label className="flex items-center cursor-pointer bg-gray-100 hover:bg-gray-200 p-3 rounded">
                <Upload className="w-4 h-4 ml-2" />
                <span className="text-sm">رفع ملف جديد</span>
                <input
                  type="file"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) onFileUpload(session.id, file);
                  }}
                />
              </label>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <MessageSquare className="w-5 h-5 ml-2" />
              التعليقات
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {session.comments?.map((comment, index) => (
                <div key={index} className="bg-gray-50 p-2 rounded text-sm">
                  {comment}
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <input
                type="text"
                placeholder="أضف تعليق..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    const comment = (e.target as HTMLInputElement).value;
                    if (comment) {
                      onAddComment(session.id, comment);
                      (e.target as HTMLInputElement).value = '';
                    }
                  }
                }}
              />
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary/90"
                onClick={(e) => {
                  const input = (e.target as HTMLElement)
                    .previousElementSibling as HTMLInputElement;
                  const comment = input.value;
                  if (comment) {
                    onAddComment(session.id, comment);
                    input.value = '';
                  }
                }}
              >
                إضافة
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            إغلاق
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

/**
 * Consultation management component for booking and tracking expert consultation sessions. Features session table, booking form modal, and session details modal with file upload and commenting.
 */
const ConsultingComponent = () => {
  // Mock consultation sessions data - replace with API integration
  const [sessions, setSessions] = useState<ConsultationSession[]>([
    {
      id: '1',
      title: 'استشارة في المراجعة الداخلية',
      expert: 'د. أحمد محمد',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'scheduled',
      files: [],
      comments: ['الجلسة الأولى لمناقشة أساسيات المراجعة'],
    },
    {
      id: '2',
      title: 'تحليل المخاطر المالية',
      expert: 'د. فاطمة علي',
      date: '2025-01-20',
      time: '2:00 PM',
      status: 'completed',
      files: [],
      comments: ['تم تحليل التقرير المالي بنجاح'],
    },
  ]);

  // Controls visibility of booking form modal
  const [showBookingForm, setShowBookingForm] = useState(false);
  // Currently selected session for viewing details
  const [selectedSession, setSelectedSession] =
    useState<ConsultationSession | null>(null);

  /**
   * Handles new consultation session booking. Currently closes form without saving - needs implementation.
   */
  const handleBookSession = () => {
    // TODO: Implement session booking API call and add to sessions list
    setShowBookingForm(false);
  };

  /**
   * Adds uploaded file to a specific consultation session
   */
  const handleFileUpload = (sessionId: string, file: File) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, files: [...(session.files || []), file] }
          : session
      )
    );
  };

  /**
   * Adds a comment to a specific consultation session
   */
  const handleAddComment = (sessionId: string, comment: string) => {
    setSessions((prev) =>
      prev.map((session) =>
        session.id === sessionId
          ? { ...session, comments: [...(session.comments || []), comment] }
          : session
      )
    );
  };

  return (
    <div className="space-y-8">
      {/* Header with Book Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-center"
      >
        <h2 className="text-2xl font-bold text-primary">جلساتك الاستشارية</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowBookingForm(true)}
          className="bg-primary text-white px-6 py-3 rounded-lg flex items-center gap-2 hover:bg-primary/90"
        >
          <Plus className="w-5 h-5" />
          حجز جلسة جديدة
        </motion.button>
      </motion.div>

      {/* Sessions Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الموضوع
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الخبير
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  التاريخ والوقت
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الحالة
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  الإجراءات
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {sessions.map((session) => (
                <SessionRow
                  key={session.id}
                  session={session}
                  onViewDetails={setSelectedSession}
                />
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      <BookingFormModal
        isOpen={showBookingForm}
        onClose={() => setShowBookingForm(false)}
        onSubmit={handleBookSession}
      />

      <SessionDetailsModal
        session={selectedSession}
        onClose={() => setSelectedSession(null)}
        onFileUpload={handleFileUpload}
        onAddComment={handleAddComment}
      />
    </div>
  );
};

export default ConsultingComponent;
