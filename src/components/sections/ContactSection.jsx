import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import { submitContactForm } from '../../services/formService';
import AnimatedSection from '../ui/AnimatedSection';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/**
 * ContactSection — contact form with validation and direct contact links.
 *
 * - React Hook Form for field validation (name, email, message)
 * - Inline error messages per field (Requirements 9.5, 9.6)
 * - Submits via formService.submitContactForm (Requirement 9.2)
 * - Shows success message on success; retains form data on failure (Requirements 9.3, 9.4)
 * - Displays direct contact links (Requirement 9.7)
 *
 * Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7
 */
const ContactSection = () => {
  const [submitStatus, setSubmitStatus] = useState(null); // null | 'success' | 'error'
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      await submitContactForm(data);
      setSubmitStatus('success');
      reset(); // Reset form only on success (Requirement 9.3, 9.4)
    } catch {
      setSubmitStatus('error'); // Retain form data — do NOT reset (Requirement 9.4)
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatedSection id="contact" variants={fadeInUp} className="py-20 bg-gray-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="max-w-3xl mx-auto px-6">
        {/* Section heading */}
        <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">
          Contact Me
        </h2>
        <p className="text-center text-gray-500 dark:text-slate-400 mb-12">
          Have a question or want to work together? Drop me a message.
        </p>

        {/* Direct contact links — Requirement 9.7 */}
        <div className="flex justify-center gap-6 mb-12">
          <a
            href="mailto:bilalalfag35@gmail.com"
            aria-label="Send email"
            className="flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            <FiMail className="w-5 h-5" />
            <span>Gmail</span>
          </a>
          <a
            href="https://www.linkedin.com/in/bilalalfaguldi/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            <FiLinkedin className="w-5 h-5" />
            <span>LinkedIn</span>
          </a>
          <a
            href="https://github.com/Bilalalfa"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="flex items-center gap-2 text-gray-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            <FiGithub className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>

        {/* Contact form — Requirement 9.1 */}
        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="bg-white dark:bg-slate-900 border border-gray-100 dark:border-slate-800 rounded-2xl shadow-md p-8 flex flex-col gap-6"
        >
          {/* Name field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="name" className="text-sm font-medium text-gray-700 dark:text-slate-200">
              Name <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
              className={`rounded-lg border px-4 py-2.5 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.name
                  ? 'border-red-400 dark:border-red-500/80 bg-red-50 dark:bg-red-950/30'
                  : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
              placeholder="Your full name"
              {...register('name', { required: 'Name is required' })}
            />
            {errors.name && (
              <p id="name-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="email" className="text-sm font-medium text-gray-700 dark:text-slate-200">
              Email <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
              className={`rounded-lg border px-4 py-2.5 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition ${
                errors.email
                  ? 'border-red-400 dark:border-red-500/80 bg-red-50 dark:bg-red-950/30'
                  : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
              placeholder="your@email.com"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: 'Please enter a valid email address',
                },
              })}
            />
            {errors.email && (
              <p id="email-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Message field */}
          <div className="flex flex-col gap-1">
            <label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-slate-200">
              Message <span aria-hidden="true" className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              rows={5}
              aria-invalid={errors.message ? 'true' : 'false'}
              aria-describedby={errors.message ? 'message-error' : undefined}
              className={`rounded-lg border px-4 py-2.5 text-gray-800 dark:text-slate-100 placeholder-gray-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none ${
                errors.message
                  ? 'border-red-400 dark:border-red-500/80 bg-red-50 dark:bg-red-950/30'
                  : 'border-gray-300 dark:border-slate-700 bg-white dark:bg-slate-800'
              }`}
              placeholder="Write your message here..."
              {...register('message', { required: 'Message is required' })}
            />
            {errors.message && (
              <p id="message-error" role="alert" className="text-sm text-red-600 dark:text-red-400">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit status messages */}
          {submitStatus === 'success' && (
            <div
              role="status"
              aria-live="polite"
              className="rounded-lg bg-green-50 dark:bg-green-950/40 border border-green-200 dark:border-green-800/60 px-4 py-3 text-green-700 dark:text-green-300 text-sm"
            >
              Your message was sent successfully! I&apos;ll get back to you soon.
            </div>
          )}
          {submitStatus === 'error' && (
            <div
              role="alert"
              aria-live="assertive"
              className="rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/60 px-4 py-3 text-red-700 dark:text-red-300 text-sm"
            >
              Something went wrong. Please try again or reach out via email directly.
            </div>
          )}

          {/* Submit button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="self-start px-8 py-3 bg-blue-600 dark:bg-blue-600 text-white font-medium rounded-lg shadow hover:bg-blue-700 dark:hover:bg-blue-500 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-colors"
          >
            {isSubmitting ? 'Sending…' : 'Send Message'}
          </button>
        </form>
      </div>
    </AnimatedSection>
  );
};

export default ContactSection;
