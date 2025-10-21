'use client';

import { motion } from 'framer-motion';
import ConsultingComponent from '../../components/ConsultingComponent';

const ConsultingPage = () => {
  return (
    <div className="min-h-screen bg-background pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="heading-1 text-primary mb-4">
            استشارات فردية (1:1 Consulting)
          </h1>
          <p className="body-text text-text-secondary max-w-3xl mx-auto text-lg">
            احصل على استشارة شخصية مع خبراء في المراجعة الداخلية والمحاسبة
            لتطوير مهاراتك وتحقيق أهدافك المهنية.
          </p>
        </motion.div>

        <ConsultingComponent />
      </div>
    </div>
  );
};

export default ConsultingPage;
