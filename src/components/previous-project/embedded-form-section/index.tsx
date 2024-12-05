'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LoadingSpinner } from '../loading';

const EmbeddedFormSection = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const content = {
    title: `Need Help to Pick the Right Event Space?`,
    desc: `Fill out our contact form for a Free Consultation or to discuss any event types not listed on our site.`,
  };

  useEffect(() => {
    window.addEventListener('message', function (event) {
      if (event.data === 'formSubmitted') {
        setIsLoading(true);
        console.log('Form was submitted in the iframe');
        setTimeout(() => {
          router.push('/thank-you');
        }, 5000);
      }
    });
  }, []);

  return (
    <div id="form-section" className="form-section">
      <div className="content-section">
        <h1>{content.title}</h1>
        <p dangerouslySetInnerHTML={{ __html: content.desc }}></p>
      </div>
      <div className="center-wrapper over-top">
        <div className="cover-image">
          <Image
            src="/assets/images/form-image.jpg"
            layout="responsive"
            width={1280}
            height={270}
            alt="Picture of the author"
          />
        </div>
        <div className="form-wrapper">
          <div className="loading" style={{ display: isLoading ? 'flex' : 'none' }}>
            <LoadingSpinner />
          </div>
          <iframe
            src="/form/form.html"
            title="Web-to-Lead Form"
            width="100%"
            height="1000"
            style={{ border: 'none', display: isLoading ? 'none' : 'block' }}
          ></iframe>
        </div>
      </div>
    </div>
  );
};

export default EmbeddedFormSection;
