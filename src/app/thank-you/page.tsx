import { buttonVariants } from '@/elements/button';
import Link from 'next/link';
import '@/styles/tailwind.css';
import { PATHS } from '../urls';

const ThankYouPage = () => {
  return (
    <article className="main-padding bg-[#642B7A]">
      <article className="wrapper min-h-screen flex flex-col items-center justify-center text-white text-center gap-6">
        <h2>Thank you for your message. We will contact you shortly.</h2>
        <h2>Have a nice day.</h2>
        <nav className="mt-4 flex gap-4 items-center justify-center flex-wrap">
          <Link className={buttonVariants()} href={PATHS.main}>
            Return to homepage
          </Link>

          <Link
            href="https://f003.cdn.net.in/file/agencies/ntuc/d'marquee-floor-plan.pdf"
            className={buttonVariants({ color: 'white' })}
            target="_blank"
          >
            Download floorplan
          </Link>
        </nav>
      </article>
    </article>
  );
};

export default ThankYouPage;
