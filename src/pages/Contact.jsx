import { useState } from "react";
import { useTheme } from "../context/ThemeContext";
import SectionHeading from "../components/SectionHeading";
import { Check, MapPin, Mail, Phone, AlertCircle } from "lucide-react";

const Contact = () => {
  const { isDarkMode } = useTheme();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Reset submission states
    setSubmitSuccess(false);
    setSubmitError(null);
    
    // Validate form
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Simulate API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulate successful submission
      setSubmitSuccess(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: ""
      });
    } catch (error) {
      setSubmitError("There was an error submitting your message. Please try again.");
      console.error("Form submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <>
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 md:pt-32 md:pb-20 bg-slate-900 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <img 
            src="https://images.pexels.com/photos/949219/pexels-photo-949219.jpeg" 
            alt="Contact TRESCO" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/80 mb-0">
              Have questions about Indian culture or planning your cultural journey?
              We're here to help!
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information */}
            <div className="lg:col-span-1">
              <SectionHeading 
                subtitle="Contact Information" 
                title="Let's Connect" 
                alignment="left"
              />
              
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="bg-red-600 dark:bg-orange-600 text-white p-3 rounded-lg mr-4">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Visit Us
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      Electronic City,Phase I<br />
                      Bangalore,560100<br />
                      India
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-600 dark:bg-orange-600 text-white p-3 rounded-lg mr-4">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Email Us
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      <a 
                        href="mailto:info@tresco.com" 
                        className="hover:text-red-600 dark:hover:text-orange-400 transition-colors"
                      >
                        info@tresco.com
                      </a>
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      <a 
                        href="mailto:support@tresco.com" 
                        className="hover:text-red-600 dark:hover:text-orange-400 transition-colors"
                      >
                        support@tresco.com
                      </a>
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-red-600 dark:bg-orange-600 text-white p-3 rounded-lg mr-4">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                      Call Us
                    </h3>
                    <p className="text-slate-600 dark:text-slate-300">
                      <a 
                        href="tel:+911234567890" 
                        className="hover:text-red-600 dark:hover:text-orange-400 transition-colors"
                      >
                        +91 3249834988
                      </a>
                    </p>
                    <p className="text-slate-600 dark:text-slate-300">
                      Monday to Friday, 9am to 6pm
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Map or Additional Info */}
              <div className="mt-8 p-6 bg-white dark:bg-slate-800 rounded-lg shadow-sm">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  When to Visit
                </h3>
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  The best time to visit India depends on the region:
                </p>
                <ul className="space-y-2 text-slate-600 dark:text-slate-300">
                  <li className="flex items-baseline">
                    <span className="w-2 h-2 bg-red-600 dark:bg-orange-400 rounded-full mr-2 mt-1.5"></span>
                    <span>Northern India: October to March</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="w-2 h-2 bg-red-600 dark:bg-orange-400 rounded-full mr-2 mt-1.5"></span>
                    <span>Southern India: November to February</span>
                  </li>
                  <li className="flex items-baseline">
                    <span className="w-2 h-2 bg-red-600 dark:bg-orange-400 rounded-full mr-2 mt-1.5"></span>
                    <span>Himalayas: March to June</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-slate-800 rounded-lg shadow-md p-8">
                <SectionHeading 
                  subtitle="Send Message" 
                  title="Get in Touch" 
                  alignment="left"
                />
                
                {submitSuccess ? (
                  <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 text-center">
                    <div className="flex justify-center mb-4">
                      <div className="bg-green-100 dark:bg-green-800/30 text-green-600 dark:text-green-400 rounded-full p-2">
                        <Check className="h-8 w-8" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-green-800 dark:text-green-400 mb-2">
                      Message Sent Successfully!
                    </h3>
                    <p className="text-green-700 dark:text-green-300 mb-4">
                      Thank you for contacting us. We'll get back to you as soon as possible.
                    </p>
                    <button
                      onClick={() => setSubmitSuccess(false)}
                      className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {submitError && (
                      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 flex items-center">
                        <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 mr-3 flex-shrink-0" />
                        <p className="text-red-700 dark:text-red-300">{submitError}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name */}
                      <div>
                        <label 
                          htmlFor="name" 
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                        >
                          Your Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.name 
                              ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500" 
                              : "border-slate-300 dark:border-slate-600 focus:ring-red-500 focus:border-red-500"
                          } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                          placeholder="John Doe"
                        />
                        {errors.name && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      
                      {/* Email */}
                      <div>
                        <label 
                          htmlFor="email" 
                          className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 rounded-lg border ${
                            errors.email 
                              ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500" 
                              : "border-slate-300 dark:border-slate-600 focus:ring-red-500 focus:border-red-500"
                          } bg-white dark:bg-slate-700 text-slate-900 dark:text-white`}
                          placeholder="john@example.com"
                        />
                        {errors.email && (
                          <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>
                    
                    {/* Subject */}
                    <div>
                      <label 
                        htmlFor="subject" 
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Subject (Optional)
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 focus:ring-red-500 focus:border-red-500 bg-white dark:bg-slate-700 text-slate-900 dark:text-white"
                        placeholder="How can we help you?"
                      />
                    </div>
                    
                    {/* Message */}
                    <div>
                      <label 
                        htmlFor="message" 
                        className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1"
                      >
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="6"
                        className={`w-full px-4 py-2 rounded-lg border ${
                          errors.message 
                            ? "border-red-300 dark:border-red-700 focus:ring-red-500 focus:border-red-500" 
                            : "border-slate-300 dark:border-slate-600 focus:ring-red-500 focus:border-red-500"
                        } bg-white dark:bg-slate-700 text-slate-900 dark:text-white resize-none`}
                        placeholder="Write your message here..."
                      ></textarea>
                      {errors.message && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                          {errors.message}
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full md:w-auto px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white font-medium rounded-lg 
                          ${isSubmitting 
                            ? "opacity-75 cursor-not-allowed" 
                            : "hover:from-red-700 hover:to-orange-700"
                          } transition-all duration-300`}
                      >
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-slate-800">
        <div className="container mx-auto px-4">
          <SectionHeading 
            subtitle="Frequently Asked Questions" 
            title="Common Inquiries" 
          />
          
          <div className="max-w-3xl mx-auto">
            {[
              {
                question: "What is the best time to visit India?",
                answer: "The best time to visit India depends on the region. In general, October to March offers the most pleasant weather in most parts of the country. However, if you're visiting the Himalayas, April to June might be better."
              },
              {
                question: "Do I need a visa to visit India?",
                answer: "Yes, most foreign nationals require a visa to visit India. India offers e-Visa facilities for tourists from many countries. Check the official Indian government visa website for the most updated information."
              },
              {
                question: "What cultural etiquette should I be aware of?",
                answer: "In India, it's customary to remove shoes before entering homes and religious places. When visiting temples, modest clothing is appropriate. Using your right hand for giving and receiving items is considered polite."
              },
              {
                question: "Is it safe to travel in India as a solo female traveler?",
                answer: "India can be safely explored by solo female travelers with proper planning and precautions. Stick to well-traveled areas, dress modestly, and be cautious with your belongings, especially at night."
              }
            ].map((faq, index) => (
              <div 
                key={index}
                className="border-b border-slate-200 dark:border-slate-700 py-6 last:border-b-0"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-slate-600 dark:text-slate-300">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;