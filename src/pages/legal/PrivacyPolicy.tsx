import { useNavigate } from "react-router-dom";

const PrivacyPolicy: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-20 px-4">
      <div className="max-w-[1170px] mx-auto">
        {/* Page Header */}
        <div className="flex items-center gap-2 text-sm mb-12">
          <button
            onClick={() => navigate("/")}
            className="text-muted hover:text-dark transition-colors"
          >
            Home
          </button>
          <span className="text-muted">/</span>
          <span className="text-dark">Privacy Policy</span>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              1. Introduction
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              Welcome to Exclusive. We respect your privacy and are committed to
              protecting your personal data. This privacy policy will inform you
              about how we look after your personal data when you visit our
              website and tell you about your privacy rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              2. Information We Collect
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              We may collect, use, store and transfer different kinds of
              personal data about you:
            </p>
            <ul className="list-disc list-inside text-dark space-y-2 ml-4">
              <li>Identity Data: name, username, date of birth</li>
              <li>
                Contact Data: email address, telephone numbers, billing address
              </li>
              <li>Transaction Data: details about payments and orders</li>
              <li>
                Technical Data: IP address, browser type, device information
              </li>
              <li>Usage Data: information about how you use our website</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              3. How We Use Your Information
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              We will only use your personal data when the law allows us to.
              Most commonly, we will use your personal data to:
            </p>
            <ul className="list-disc list-inside text-dark space-y-2 ml-4">
              <li>Process and deliver your orders</li>
              <li>Manage your account and provide customer support</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Improve our website and services</li>
              <li>Protect against fraud and security issues</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              4. Data Security
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              We have implemented appropriate security measures to prevent your
              personal data from being accidentally lost, used, or accessed in
              an unauthorized way. We limit access to your personal data to
              those employees, agents, contractors who have a business need to
              know.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              5. Your Rights
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              Under data protection laws, you have rights including:
            </p>
            <ul className="list-disc list-inside text-dark space-y-2 ml-4">
              <li>The right to access your personal data</li>
              <li>The right to correct inaccurate personal data</li>
              <li>The right to request deletion of your personal data</li>
              <li>The right to object to processing of your personal data</li>
              <li>The right to data portability</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              6. Cookies
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              Our website uses cookies to distinguish you from other users. This
              helps us provide you with a good experience and allows us to
              improve our website. You can set your browser to refuse all or
              some browser cookies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              7. Contact Us
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              If you have any questions about this privacy policy or our privacy
              practices, please contact us:
            </p>
            <ul className="list-none text-dark space-y-2">
              <li>
                <strong>Email:</strong> exclusive@gmail.com
              </li>
              <li>
                <strong>Phone:</strong> +88015-88888-9999
              </li>
              <li>
                <strong>Address:</strong> 111 Bijoy Sarani, Dhaka, DH 1515,
                Bangladesh
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
