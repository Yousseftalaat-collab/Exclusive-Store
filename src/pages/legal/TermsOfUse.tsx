import { useNavigate } from "react-router-dom";

const TermsOfUse: React.FC = () => {
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
          <span className="text-dark">Terms Of Use</span>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              By accessing and using the Exclusive website, you accept and agree
              to be bound by the terms and provision of this agreement. If you
              do not agree to abide by the above, please do not use this
              service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              2. Use License
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              Permission is granted to temporarily download one copy of the
              materials on Exclusive's website for personal, non-commercial
              transitory viewing only. This is the grant of a license, not a
              transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside text-dark space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose</li>
              <li>Attempt to reverse engineer any software on the website</li>
              <li>Remove any copyright or proprietary notations</li>
              <li>Transfer the materials to another person</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              3. Account Terms
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              When you create an account with us, you must:
            </p>
            <ul className="list-disc list-inside text-dark space-y-2 ml-4">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your password</li>
              <li>Be responsible for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
              <li>Be at least 18 years old or have parental consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              4. Products and Services
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              All products and services are subject to availability. We reserve
              the right to discontinue any product at any time. Prices for our
              products are subject to change without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              5. Order and Payment
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              By placing an order, you warrant that:
            </p>
            <ul className="list-disc list-inside text-dark space-y-2 ml-4">
              <li>
                You are legally capable of entering into binding contracts
              </li>
              <li>You are at least 18 years old</li>
              <li>The payment information you provide is accurate</li>
              <li>You will pay all charges at the prices in effect</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              6. Shipping and Delivery
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              We will make every effort to deliver your order within the
              estimated timeframe. However, we are not responsible for delays
              caused by circumstances beyond our control, including but not
              limited to natural disasters, strikes, or transportation issues.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              7. Returns and Refunds
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              Our Return and Refund Policy is part of these Terms. Please review
              our Return Policy posted on this website to understand your rights
              and obligations regarding returns and refunds.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              8. Prohibited Uses
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              You may not use our website:
            </p>
            <ul className="list-disc list-inside text-dark space-y-2 ml-4">
              <li>For any unlawful purpose</li>
              <li>To solicit others to perform unlawful acts</li>
              <li>To violate any regulations, rules, or laws</li>
              <li>To infringe upon intellectual property rights</li>
              <li>To transmit any harmful code or malware</li>
              <li>To collect or track personal information of others</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              Exclusive shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages resulting from your
              use of or inability to use the service, even if we have been
              advised of the possibility of such damages.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              10. Modifications
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              We reserve the right to modify or replace these Terms at any time.
              If a revision is material, we will provide at least 30 days'
              notice prior to any new terms taking effect. Continued use of our
              website after changes constitutes acceptance of those changes.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-heading font-semibold text-dark mb-4">
              11. Contact Information
            </h2>
            <p className="text-dark leading-relaxed mb-4">
              If you have any questions about these Terms, please contact us:
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

export default TermsOfUse;
