import { useCallback, useState, useRef } from 'react';
import Link from 'next/link';
import Layout from '../components/layout';
import Button from '../components/button';
import UploadProgressFullpage from '../components/upload-progress-fullpage';

export default function Index () {
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setFile(acceptedFiles[0]);
    } else {
      console.warn('got a drop event but no file'); // eslint-disable-line no-console
    }
  }, []);

  const onInputChange = () => {
    setFile(inputRef.current.files[0]);
    console.log('debug input changed'); // eslint-disable-line no-console
  };

  if (file) {
    return <UploadProgressFullpage file={file} />;
  }

  return (
    <Layout
      alignTop
      onFileDrop={onDrop}
    >
      <div className="drop-notice">
        <h2>Drag and drop a file anywhere</h2>
      </div>
      <div className="headline-mobile">
        <h1>Add a video.</h1>
        <h1>Stream it anywhere.</h1>
      </div>
      <div className="headline-desktop">
        <h1>Add a video. Stream it anywhere.</h1>
      </div>
      <div className="cta">
        <label htmlFor="file-input">
          <Button type="button" onClick={() => inputRef.current.click()}>
            Upload a video
          </Button>
          <input id="file-input" type="file" onChange={onInputChange} ref={inputRef} />
        </label>
      </div>
      <div className="cta">
        <Link href="/record"><Button buttonLink>Record from camera</Button></Link>
      </div>
      <style jsx>{`
        input {
          display: none;
        }
        .headline-mobile {
          display: block;
        }
        .headline-desktop {
          display: none;
        }
        .drop-notice {
          text-align: center;
        }
        .cta {
          margin-top: 30px;
        }
        @media only screen and (min-width: 756px) {
          .headline-mobile {
            display: none;
          }
          .headline-desktop {
            display: block;
          }
        }
      `}
      </style>
    </Layout>
  );
}
