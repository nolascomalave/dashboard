import React, { useState, useRef } from 'react'
import Button from './Button';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
  convertToPixelCrop,
} from 'react-image-crop'
import { canvasPreview } from '@/util/setCanvasPreview';
import { useDebounceEffect } from '@/hooks/useDebounceEffect';
import styles from './ImageCropper.module.scss';
import InputRadio from './InputRadio';
import { createPortal } from 'react-dom';
// Aspect Ratio:
const aspects = [
  [1, 1],
  [6, 13],
  [4, 3],
  [3, 2],
  [8, 5],
  [16, 9],
  [19, 10]
];

// This is to demonstate how to make and center a % aspect crop
// which is a bit trickier so we use some helper functions.
function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  )
}

export default function ImageCropper({
  onAccept = (val: string) => undefined,
  urlImg,
  closeModal = () => null
}: {
  onAccept: (val: string, blob?: Blob) => void;
  urlImg: string;
  closeModal?: () => void
}) {
  const [imgSrc, setImgSrc] = useState(urlImg),
    previewCanvasRef = useRef<HTMLCanvasElement>(null),
    imgRef = useRef<HTMLImageElement>(null),
    // hiddenAnchorRef = useRef<HTMLAnchorElement>(null),
    blobUrlRef = useRef(''),
    [crop, setCrop] = useState<Crop>(),
    [completedCrop, setCompletedCrop] = useState<PixelCrop>(),
    [aspect, setAspect] = useState<number | undefined>(1),
    initialRotate = 0,
    [rotate, setRotate] = useState(initialRotate),
    minRotate = -180,
    maxRotate = 180,
    stepRotate = 1,
    initialScale = 1,
    [scale, setScale] = useState(initialScale),
    minScale = 0.1,
    maxScale = 20.0,
    stepScale = 0.1,
    maxLengthScale = 4;

  /* function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  } */

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function getUrl(download: boolean = false) {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
      console.log(image, previewCanvas, completedCrop);
      throw new Error('Crop canvas does not exist')
    }

    // This will size relative to the uploaded image
    // size. If you want to size according to what they
    // are looking at on screen, remove scaleX + scaleY
    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height

    const offscreen = new OffscreenCanvas(
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
    )
    const ctx = offscreen.getContext('2d')
    if (!ctx) {
      throw new Error('No 2d context')
    }

    ctx.drawImage(
      previewCanvas,
      0,
      0,
      previewCanvas.width,
      previewCanvas.height,
      0,
      0,
      offscreen.width,
      offscreen.height,
    )
    // You might want { type: "image/jpeg", quality: <0 to 1> } to
    // reduce image size
    const blob = await offscreen.convertToBlob({
      type: 'image/png',
    })

    if (blobUrlRef.current) {
      URL.revokeObjectURL(blobUrlRef.current)
    }
    blobUrlRef.current = URL.createObjectURL(blob);

    if(!download && !!onAccept) {
      onAccept(blobUrlRef.current, blob);
    }

    /* if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click()
    } */
  }

  const changeScale = (target: HTMLElement, value: string | number) => {
    value = Number(value);

    if(isNaN(value)) {
      target.innerText = scale.toString();
      return;
    }

    if(value < minScale) {
      target.innerText = minScale.toString();
      return setScale(minScale);
    } else if(value > maxScale) {
      target.innerText = maxScale.toString();
      return setScale(maxScale);
    }

    target.innerText = Math.round(value) !== value ? value.toFixed(1) : value.toString();
    setScale(Number(target.innerText));
  }

  const changeRotate = (target: HTMLElement, value: string | number) => {
    value = Number(value);

    if(isNaN(value)) {
      target.innerText = rotate.toString();
      return;
    }

    if(value < minRotate) {
      target.innerText = minRotate.toString();
      return setRotate(minRotate);
    } else if(value > maxRotate) {
      target.innerText = maxRotate.toString();
      return setRotate(maxRotate);
    }

    value = Math.round(value);

    target.innerText = value.toString();
    setRotate(Number(target.innerText));
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(
          imgRef.current,
          previewCanvasRef.current,
          completedCrop,
          scale,
          rotate,
        )
      }
    },
    100,
    [completedCrop, scale, rotate]);

  function handleChangeAspect(index?: number) {
    const aspect = index === undefined ? undefined : aspects[index];

    if (!aspect) {
      setAspect(undefined);
    } else {
      setAspect(aspect[0] / aspect[1]);

      if (imgRef.current) {
        const { width, height } = imgRef.current,
          realWidth = width - ((width / 100) * 5),
          realHeight = height - ((height / 100) * 5);
        const newCrop = centerAspectCrop(realWidth, realHeight, aspect[0] / aspect[1]);
        setCrop(newCrop);
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, realWidth, realHeight));
      }
    }
  }

  return (
    <div className={styles.ImageCropper}>
      <div className='flex items-center h-full overflow-hidden w-full justify-center gap-4 md:gap-8 max-w-[40rem]'>
        {!!imgSrc && (
          <>
            <ReactCrop
              crop={crop}
              onChange={(_, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={aspect}
              className='h-full overflow-hidden'
              // circularCrop
            >
              <img
                ref={(e: any) => {
                  if(e !== imgRef.current && !!e) {
                    e.parentNode.style.height = e.parentNode.parentNode.clientHeight.toString() + 'px';
                  }

                  imgRef.current = e;
                }}
                alt="Crop me"
                src={imgSrc}
                className='w-full h-full flex-grow object-contain object-center'
                // width={}
                style={{
                  transform: !(scale === initialScale && initialRotate === rotate) ? `scale(${scale}) rotate(${rotate}deg)` : undefined,
                  // objectPosition: 'center top'
                }}
                onLoad={onImageLoad}
              />
            </ReactCrop>

            {(!!completedCrop) && (
              <>
                  {createPortal(<canvas
                    ref={previewCanvasRef}
                    className='fixed left-0 top-0'
                    style={{
                      opacity: 0,
                      zIndex: -1000,
                      border: '0.06125rem solid black',
                      objectFit: 'contain',
                      /* width: '30%',
                      minWidth: '30%',
                      maxWidth: '30%' */
                      width: completedCrop.width,
                      height: completedCrop.height,
                    }}
                  />, document.body)}
                {/* <div>
                  <button onClick={onDownloadCropClick}>Download Crop</button>
                  <div style={{ fontSize: 12, color: '#666' }}>
                    If you get a security error when downloading try opening the
                    Preview in a new tab (icon near top right).
                  </div>
                  <a
                    href="#hidden"
                    ref={hiddenAnchorRef}
                    download
                    style={{
                      position: 'absolute',
                      top: '-200vh',
                      visibility: 'hidden',
                    }}
                  >
                    Hidden download
                  </a>
                </div> */}
              </>
            )}
          </>
        )}
      </div>

      <ul className='flex gap-2 flex-wrap'>
        {aspects.map((asp: any, i: number) => (
          <li>
            <InputRadio
              key = {i}
              name = "image-cropper-aspect"
              onChange={(e: any) => handleChangeAspect(i)}
              checked={aspect === (aspects[i][0] / aspects[i][1])}
            >
              {asp[0]}:{asp[1]}
            </InputRadio>
          </li>
        ))}

        <InputRadio
          name = "image-cropper-aspect"
          onChange={(e: any) => handleChangeAspect()}
          checked={aspect === undefined}
        >
          None
        </InputRadio>
      </ul>

      <div className="Crop-Controls flex-shrink-0">
        {/* <input type="file" accept="image/*" onChange={onSelectFile} /> */}
        <div className='flex flex-col items-center justify-around md:flex-row gap-2 md:flex-shrink-0'>
          <div className='flex justify-center w-full max-w-80 items-center gap-4'>
            <Button
              IconName='Minus'
              className='py-1 px-1.5'
              onClick={() => {
                let newScale = Number((scale - stepScale).toFixed(1));

                setScale(newScale < minScale ? minScale : newScale)
              }}
            />

            <div className='w-full'>
              <div className='flex items-center gap-2 justify-center font-bold'>
                <span>
                  Scale:
                </span>
                <span
                  contentEditable='true'
                  onKeyDown={(e: any) => {
                    if(e.keyCode === 13) {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                  onBlur={(e: any) => changeScale(e.target, e.target.textContent)}
                  /* onInput={(e: any) => {
                    if(e.nativeEvent.data !== '.' && isNaN(Number(e.nativeEvent.data))) {
                      changeScale(e.target, e.target.textContent);
                    }
                  }} */
                  dangerouslySetInnerHTML={{__html: scale}}
                />
              </div>

              <input
                type="range"
                value={scale}
                min={minScale}
                max={maxScale}
                step={stepScale}
                onChange={(e) => setScale(Number(e.target.value))}
                className={styles["PB-range-slider"]}
              />
            </div>
            <Button
              IconName='Plus'
              className='py-1 px-1.5'
              onClick={() => {
                let newScale = Number((scale + stepScale).toFixed(1));

                setScale(newScale > maxScale ? maxScale : newScale)
              }}
            />
          </div>

          <div className='flex justify-center w-full max-w-80 items-center gap-4'>
            <Button
              IconName='Minus'
              className='py-1 px-1.5'
              onClick={() => {
                let newRotate = rotate - stepRotate;

                setRotate(newRotate < minRotate ? minRotate : newRotate);
              }}
            />

            <div className='w-full'>
              <div className='flex items-center gap-2 justify-center font-bold'>
                <span>
                  Rotate:
                </span>
                <span
                  contentEditable='true'
                  onKeyDown={(e: any) => {
                    if(e.keyCode === 13) {
                      e.preventDefault();
                      e.target.blur();
                    }
                  }}
                  onBlur={(e: any) => changeRotate(e.target, e.target.textContent)}
                  dangerouslySetInnerHTML={{__html: rotate}}
                />
              </div>

              <input
                type="range"
                value={rotate}
                min={minRotate}
                max={maxRotate}
                step={stepRotate}
                onChange={(e) => setRotate(Number(e.target.value))}
                className={styles["PB-range-slider"]}
              />
            </div>
            <Button
              IconName='Plus'
              className='py-1 px-1.5'
              onClick={() => {
                let newRotate = rotate + stepRotate;

                setRotate(newRotate > maxRotate ? maxRotate : newRotate);
              }}
            />
          </div>
        </div>
        {/* <div>
          <button onClick={handleChangeAspect}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div> */}
      </div>

      <div className='flex items-center justify-center gap-4'>
        <Button onClick = {closeModal}>
          Cancel
        </Button>

        <Button onClick = {() => getUrl()}>
          Accept
        </Button>
      </div>
    </div>
  )
}
