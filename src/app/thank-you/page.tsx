import { buttonVariants } from '@/elements/button';
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <div className="thank-you-page">
      <h2>Thank you for your message. We will contact you shortly.</h2>
      <h2>Have a nice day.</h2>
      <div className="flex gap-4 flex-wrap">
        <Link className={buttonVariants()} href={'/'}>
          Return to homepage
        </Link>

        <Link
          href="https://f003.cdn.net.in/file/agencies/ntuc/d'marquee-floor-plan.pdf"
          className={buttonVariants({ color: 'white' })}
          target="_blank"
        >
          Download floorplan
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
