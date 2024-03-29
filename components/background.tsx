import type { ISourceOptions, Container, Engine } from "tsparticles-engine";
import { loadPolygonMaskPlugin } from "tsparticles-plugin-polygon-mask";
import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useEffect } from "react";


const useMobileDetect = () => {
  const getMobileDetect = (userAgent: NavigatorID['userAgent']) => {
    const isAndroid = () => Boolean(userAgent.match(/Android/i))
    const isIos = () => Boolean(userAgent.match(/iPhone|iPad|iPod/i))
    const isOpera = () => Boolean(userAgent.match(/Opera Mini/i))
    const isWindows = () => Boolean(userAgent.match(/IEMobile/i))
    const isSSR = () => Boolean(userAgent.match(/SSR/i))
    const isMobile = () => Boolean(isAndroid() || isIos() || isOpera() || isWindows())
    const isDesktop = () => Boolean(!isMobile() && !isSSR())
    return {
      isMobile,
      isDesktop,
      isAndroid,
      isIos,
      isSSR,
    }
  }

  useEffect(() => {}, [])
  const userAgent = typeof navigator === 'undefined' ? 'SSR' : navigator.userAgent
  return getMobileDetect(userAgent)
}

function getOptions(): ISourceOptions {
  const device = useMobileDetect();

  var polygonScale = 0.8;
  var polygonRadius = 10;
  var particlesValue = 500;
  var particlesSpeed =  1;

  if (device.isMobile()) {
    polygonScale = 0.4;
    polygonRadius = 5;
    particlesValue = 250;
    particlesSpeed =  0.5;
  }

  const options: ISourceOptions = {
      name: "Polygon Mask",
      interactivity: {
          events: {
              onClick: {
                  enable: false,
                  mode: "push",
              },
              onDiv: {
                  elementId: "repulse-div",
                  enable: false,
                  mode: "repulse",
              },
              onHover: {
                  enable: true,
                  mode: "bubble",
                  parallax: {
                      enable: false,
                      force: 2,
                      smooth: 10,
                  },
              },
          },
          modes: {
              bubble: {
                  distance: 40,
                  duration: 2,
                  opacity: 8,
                  size: 6,
              },
              connect: {
                  distance: 80,
                  links: {
                      opacity: 0.5,
                  },
                  radius: 60,
              },
              grab: {
                  distance: 400,
                  links: {
                      opacity: 1,
                  },
              },
              push: {
                  quantity: 4,
              }, remove: {
                  quantity: 2,
              },
              repulse: {
                  distance: 200,
                  duration: 0.4,
              },
              slow: {
                  active: false,
                  radius: 0,
                  factor: 1,
              },
          },
      },
      particles: {
          color: {
              value: "#ffffff",
          },
          links: {
              blink: false,
              color: "#ffffff",
              consent: false,
              distance: 30,
              enable: true,
              opacity: 0.4,
              width: 1,
          },
          move: {
              enable: true,
              outModes: "bounce",
              speed: particlesSpeed,
          },
          number: {
              limit: 0,
              value: particlesValue,
          },
          opacity: {
              animation: {
                  enable: true,
                  speed: 2,
                  sync: false,
              },
              value: {
                  min: 0.05,
                  max: 0.4,
              },
          },
          shape: {
              type: "circle",
          },
          size: {
              value: 1,
          },
      },
      polygon: {
          draw: {
              enable: true,
              lineColor: "rgba(255,255,255,0.2)",
              lineWidth: 1,
          },
          enable: true,
          move: {
              radius: polygonRadius,
          },
          position: {
              x: 50,
              y: 50,
          },
          inline: {
              arrangement: "equidistant",
          },
          scale: polygonScale,
          type: "inline",
          data: {
            path: "M 94.503 39.224 L 41.087 169.658 M 40.5 169.5 L 50.5 231 M 50.5 230.5 L 80.5 309 M 94.5 40.5 L 58.5 165.5 M 40.5 171.5 L 59.5 165 M 59.5 165 L 72 223 M 58.5 165 L 50 229.5 M 72 222.5 L 95 232.5 M 72 222.5 L 122 199 M 122 199.5 L 147 152.5 M 147 152 L 215 98 M 215 98.5 L 162 156.5 M 162 156.5 L 133 211 M 133 211 L 148.5 151 M 122 199 L 133 210.5 M 133 210.5 L 94.5 231.5 M 96.5 231 L 121 199 M 97 232 L 76 243 M 76 243 L 51 229.5 M 77.5 243 L 80 309.5 M -1 254 L 24 304 M -0.5 253 L 30.5 299 M 30.5 298.5 L 80.5 310 M 80.5 310 L 33.5 292.5 M 33.5 292.5 L -0.5 252.5 M 24.5 304 L 132 367 M 132 367 L 79.5 309.5 M 79.5 309.5 L 145 351 M 145 351 L 212.5 381.5 M 212.5 381.5 L 219 368.5 M 229 374.5 L 201 356.5 M 201 356.5 L 143.5 349.5 M 143.5 349.5 L 97 309 M 97 309 L 77.5 241 M 132 366 L 213 381.5 M 213 381.5 L 220 384.5 M 220 384.5 L 248.5 411.5 M 248.5 411.5 L 248 425 M 248 425 L 258 441.5 M 258 441.5 L 262.5 400.5 M 262.5 400.5 L 249.5 410 M 262.5 400.5 L 278 387.5 M 278 387.5 L 229.5 374.5 M 229.5 374.5 L 263 401 M 229.5 373 L 239.5 402.5 M 200 356.5 L 159 294 M 159 294 L 166 216 M 166 216 L 176.5 298 M 176.5 298 L 224.5 356 M 224.5 355.5 L 278 389 M 176.5 297.5 L 194.5 348 M 217.5 289 L 237 364 M 217 289.5 L 244 224 M 244 224 L 230.5 295 M 230.5 295 L 248.5 354 M 248.5 354 L 277.5 388.5 M 217.5 289.5 L 231 296.5 M 231 296 L 232.5 346.5 M 258.5 441 L 300 403 M 300 403 L 263 399.5 M 300 402.5 L 291 392.5 M 291 392.5 L 277.5 388 M 258 441 L 249.5 445.5 M 249.5 445.5 L 241 442 M 241 442 L 175.5 387.5 M 175.5 387.5 L 155.5 386.5 M 155.5 386.5 L 154 407.5 M 154 407.5 L 169 445.5 M 169 445.5 L 192 471 M 192 471 L 230.5 486 M 230.5 486 L 252 505.5 M 252 505.5 L 245.5 488.5 M 245.5 488.5 L 243 467 M 243 467 L 249.5 444.5 M 242.5 442.5 L 224.5 457 M 225 457 L 244.5 467 M 244 467 L 272 468.5 M 272 468.5 L 256.5 440.5 M 215 444 L 222 452 M 222 452 L 251 504.5 M 214 444 L 230 486 M 213.5 444.5 L 191 469 M 214 443.5 L 169 444.5 M 169 444.5 L 168 401 M 168 401 L 175.5 388.5 M 155 388 L 169 400 M 169 400 L 155 407 M 169 400 L 183 434.5 M 182.5 434.5 L 195.5 403 M 183 435.5 L 227 429.5 M 183 435.5 L 213.5 444 M 299.5 403 L 327 403 M 327 402.5 L 337.5 393 M 337.5 393 L 350 388 M 350 388 L 346 416.5 M 346 416.5 L 336.5 394 M 311.5 403 L 272 468.5 M 272 468.5 L 300 402.5 M 257.5 441 L 281 447 M 311.5 403 L 314 497.5 M 314 497.5 L 273 467 M 273 467 L 277 490 M 277 490 L 289 514.5 M 289 514.5 L 314 497 M 314 497 L 358.5 464.5 M 359 464.5 L 337.5 448 M 337.5 448 L 313.5 497 M 337.5 447.5 L 311 401.5 M 272.5 467 L 251 505.5 M 251 505.5 L 265 506.5 M 265 506.5 L 277.5 489.5 M 266.5 506 L 253.5 530.5 M 251.5 506 L 257 574.5 M 265 504.5 L 289.5 515 M 289.5 515 L 266 565.5 M 266 565.5 L 254 529.5 M 288.5 515 L 314 521.5 M 314 521 L 338 511.5 M 338 511.5 L 313.5 495.5 M 338 510.5 L 352.5 520.5 M 352.5 520.5 L 374 482.5 M 374.5 482.5 L 359 463.5 M 359 463.5 L 346.5 415.5 M 311 403.5 L 350 428 M 350.5 428.5 L 381 413 M 381 413 L 346.5 416.5 M 350 388.5 L 381.5 414 M 382.5 413 L 393.5 387.5 M 393.5 387.5 L 379 377 M 379 377 L 375 359 M 375 359 L 348 389.5 M 348 389.5 L 380 376.5 M 394 387.5 L 349 388.5 M 391 355 L 393.5 388.5 M 393.5 388.5 L 416.5 367 M 416.5 367 L 497 339 M 375 359 L 399 298.5 M 399 298.5 L 389 240.5 M 389 240.5 L 411 300.5 M 411 300.5 L 391 355.5 M 391 355.5 L 393.5 312 M 392 355.5 L 416 345 M 416.5 345 L 467 303.5 M 467 303.5 L 486.5 269 M 486.5 269 L 494.5 216 M 494.5 216 L 501 270.5 M 501 270.5 L 481.5 310 M 481.5 310 L 457 332.5 M 457 332.5 L 466.5 304 M 457.5 332.5 L 417 343.5 M 407 349.5 L 424.5 344.5 M 424.5 344.5 L 497 338 M 497 338 L 533.5 271.5 M 512.5 309.5 L 630.5 215.5 M 630.5 215.5 L 635 156.5 M 635 156.5 L 618 210 M 618 210 L 558.5 260 M 558.5 260 L 550 264 M 550 264 L 533.5 272 M 533.5 272 L 551.5 191 M 552 191.5 L 540.5 169.5 M 540.5 169.5 L 489.5 131.5 M 489.5 131.5 L 438.5 55 M 438.5 55 L 504.5 127.5 M 504.5 127.5 L 491.5 133 M 504 126.5 L 541.5 170 M 541.5 170 L 564.5 178.5 M 564.5 178.5 L 550 159 M 550 159 L 504 126.5 M 565 179 L 556 261 M 549.5 201.5 L 550 265 M 560 258 L 581.5 176.5 M 581.5 176.5 L 596.5 85.5 M 596.5 86 L 544 0 M 544 0 L 578 89.5 M 578 89.5 L 577 115.5 M 577 116 L 564.5 178.5 M 564.5 178.5 L 588 133.5 M 589.5 122.5 L 578 115.5 M 578 116 L 596 86 M 596.5 86 L 556.5 33 M 498 338 L 569 281 M 569 281 L 631 216 M 381.5 413 L 380.5 429.5 M 380.5 429.5 L 358.5 464.5 M 358.5 464.5 L 374.5 461 M 374.5 461 L 379 444 M 379 444 L 374 439 M 379 443.5 L 391.5 441.5 M 391.5 441.5 L 430 392.5 M 430 392.5 L 454 377.5 M 454 377.5 L 475.5 376.5 M 475.5 376.5 L 474.5 399.5 M 474.5 399.5 L 467 412 M 467 412 L 462 440.5 M 462 440.5 L 440 468 M 440 468 L 459.5 391 M 459.5 391 L 475 376.5 M 460 391 L 474.5 398.5 M 459.5 390.5 L 467 412 M 460 390 L 453.5 377 M 450.5 424.5 L 429.5 392.5 M 451 424 L 400.5 428.5 M 451 424.5 L 417.5 442.5 M 417.5 442.5 L 400 431.5 M 418 442 L 441 467.5 M 441 467.5 L 424 474 M 424 474 L 387.5 506.5 M 387.5 506.5 L 418 441 M 418 441 L 415.5 482 M 379 443.5 L 389 460.5 M 389 460.5 L 388.5 477.5 M 388.5 477.5 L 384 494.5 M 374.5 461 L 387.5 507 M 374.5 483 L 383.5 492.5 M 387 506 L 385.5 521.5 M 385.5 521.5 L 398.5 591.5 M 386 521.5 L 339.5 537.5 M 339.5 537.5 L 352 520.5 M 533 271.5 L 493 322.5 M 493 322.5 L 456.5 333 M 339.5 537.5 L 353.5 543.5 M 353.5 543.5 L 385 541 M 388 533 L 353.5 586 M 382.5 541.5 L 378.5 564 M 378.5 564.5 L 354 586.5 M 379 564 L 425.5 659.5 M 425.5 659.5 L 398.5 591 M 339.5 538 L 333 555.5 M 333 555.5 L 308 557 M 308 557 L 321 569.5 M 321 569.5 L 334 555.5 M 334 555.5 L 354.5 587 M 334 555.5 L 354 543 M 308 557 L 302.5 542.5 M 302.5 542.5 L 287.5 549.5 M 282 531 L 297.5 591 M 297.5 591 L 307.5 556.5 M 302 543.5 L 282.5 530.5 M 266 564.5 L 298.5 591.5 M 298.5 591.5 L 287.5 591 M 287.5 591 L 265 563.5 M 265 563.5 L 270.5 669 M 270.5 669 L 294 646.5 M 294 646.5 L 265 563.5 M 282.5 611 L 270.5 670.5 M 287.5 591 L 315.5 707 M 315.5 707 L 293.5 645.5 M 315.5 707 L 270.5 669 M 270.5 669 L 290 753 M 290 753 L 315 707 M 315 707 L 322 832 M 321.5 831.5 L 350.5 735.5 M 350.5 735.5 L 315 705.5 M 350.5 735.5 L 345 706.5 M 345 706.5 L 381 671.5 M 381 671.5 L 425.5 659 M 381.5 672 L 378.5 564 M 354.5 585.5 L 381.5 671.5 M 354 585.5 L 345.5 707.5 M 345.5 707.5 L 319.5 595.5 M 319.5 595.5 L 320.5 569 M 319 594.5 L 355 585 M 319.5 595 L 297.5 591.5 M 289.5 600 L 333 646.5 M 289 599 L 345.5 708 M 345 707 L 404.5 758.5 M 404.5 758.5 L 381.5 671.5 M 425.5 659 L 416 733.5 M 416 733.5 L 385 793.5 M 385 793.5 L 350 734.5 M 384.5 793 L 322 833.5 M 322 833.5 L 259 780 M 259 780 L 290 754 M 290 754 L 322 833.5 M 258.5 780.5 L 251.5 703.5 M 251.5 703.5 L 257 574 M 251.5 703 L 271.5 670 M 256.5 573.5 L 231 645.5 M 231 645.5 L 233 722 M 233 722 L 259 780.5 M 328 630.5 L 353.5 585.5",
            size: {
              width: 636,
              height: 833.5
            }
          }
      },
      background: {
          color: "#000000",
          image: "",
          position: "50% 50%",
          repeat: "no-repeat",
          size: "cover",
      },
  };

  return options;
}

export default function IndexBackground() {
  const particlesInit = useCallback(async (engine: Engine) => {
      await loadSlim(engine);
      await loadPolygonMaskPlugin(engine);
  }, []);
  const options = getOptions();

  return (
    <div>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={options}
      />
    </div>
  )
}
