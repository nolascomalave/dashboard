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

export default function ImageCropper() {
  const [imgSrc, setImgSrc] = useState(''),
    previewCanvasRef = useRef<HTMLCanvasElement>(null),
    imgRef = useRef<HTMLImageElement>(null),
    hiddenAnchorRef = useRef<HTMLAnchorElement>(null),
    blobUrlRef = useRef(''),
    [crop, setCrop] = useState<Crop>(),
    [completedCrop, setCompletedCrop] = useState<PixelCrop>(),
    [scale, setScale] = useState(1.0),
    [rotate, setRotate] = useState(0),
    [aspect, setAspect] = useState<number | undefined>(16 / 9),
    minScale = 0.1,
    maxScale = 20.0,
    stepScale = 0.1,
    maxLengthScale = 4;

  function onSelectFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.files && e.target.files.length > 0) {
      setCrop(undefined) // Makes crop preview update between images.
      const reader = new FileReader()
      reader.addEventListener('load', () =>
        setImgSrc(reader.result?.toString() || ''),
      )
      reader.readAsDataURL(e.target.files[0])
    }
  }

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget
      setCrop(centerAspectCrop(width, height, aspect))
    }
  }

  async function onDownloadCropClick() {
    const image = imgRef.current
    const previewCanvas = previewCanvasRef.current
    if (!image || !previewCanvas || !completedCrop) {
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
    blobUrlRef.current = URL.createObjectURL(blob)

    if (hiddenAnchorRef.current) {
      hiddenAnchorRef.current.href = blobUrlRef.current
      hiddenAnchorRef.current.click()
    }
  }

  const changeScale = (target: HTMLElement, value: string | number) => {
    const regExp = /^[0-2](\.[1-9])?$/;

    console.log(value);

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
    [completedCrop, scale, rotate],
  )

  function handleToggleAspectClick() {
    if (aspect) {
      setAspect(undefined)
    } else {
      setAspect(16 / 9)

      if (imgRef.current) {
        const { width, height } = imgRef.current
        const newCrop = centerAspectCrop(width, height, 16 / 9)
        setCrop(newCrop)
        // Updates the preview
        setCompletedCrop(convertToPixelCrop(newCrop, width, height))
      }
    }
  }

  return (
    <div className={styles.ImageCropper}>
      <div className="Crop-Controls">
        <input type="file" accept="image/*" onChange={onSelectFile} />
        <div className='flex items-center justify-center flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <label htmlFor="scale-input">
              Scale:
            </label>
            <span
              contentEditable='true'
              onBlur={(e: any) => changeScale(e.target, e.target.textContent)}
              /* onInput={(e: any) => {
                if(e.nativeEvent.data !== '.' && isNaN(Number(e.nativeEvent.data))) {
                  changeScale(e.target, e.target.textContent);
                }
              }} */
              dangerouslySetInnerHTML={{__html: scale}}
            />
          </div>
          <div className='flex justify-center w-full max-w-80 items-center gap-4'>
            <Button
              IconName='Minus'
              className='py-1 px-1.5'
              onClick={() => {
                let newScale = Number((scale - stepScale).toFixed(1));

                setScale(newScale < minScale ? minScale : newScale)
              }}
            />

            <input
              type="range"
              value={scale}
              min={minScale}
              max={maxScale}
              step={stepScale}
              onChange={(e) => setScale(Number(e.target.value))}
              className={styles["PB-range-slider"]}
            />

            <Button
              IconName='Plus'
              className='py-1 px-1.5'
              onClick={() => {
                let newScale = Number((scale + stepScale).toFixed(1));

                setScale(newScale > maxScale ? maxScale : newScale)
              }}
            />
          </div>
        </div>
        <div>
          <label htmlFor="rotate-input">Rotate: </label>
          <input
            id="rotate-input"
            type="number"
            value={rotate}
            disabled={!imgSrc}
            onChange={(e) =>
              setRotate(Math.min(180, Math.max(-180, Number(e.target.value))))
            }
          />
        </div>
        <div>
          <button onClick={handleToggleAspectClick}>
            Toggle aspect {aspect ? 'off' : 'on'}
          </button>
        </div>
      </div>





      {!!imgSrc && (
        <ReactCrop
          crop={crop}
          onChange={(_, percentCrop) => setCrop(percentCrop)}
          onComplete={(c) => setCompletedCrop(c)}
          aspect={aspect}
          // minWidth={400}
          minHeight={100}
          // circularCrop
        >
          <img
            ref={imgRef}
            alt="Crop me"
            src={imgSrc}
            style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
            onLoad={onImageLoad}
          />
        </ReactCrop>
      )}
      {!!completedCrop && (
        <>
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: '1px solid black',
                objectFit: 'contain',
                width: completedCrop.width,
                height: completedCrop.height,
              }}
            />
          </div>
          <div>
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
          </div>
        </>
      )}
    </div>
  )
}
