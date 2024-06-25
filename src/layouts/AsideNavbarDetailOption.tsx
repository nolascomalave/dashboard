'use client';
import { Component, RefObject, createRef } from 'react';
import styles from './AsideNavbarDetailOption.module.scss';
import NavButton from './NavButton';
import * as LudiceIcons from 'lucide-react';
import { clsx } from 'clsx';

export default class AsideNavbarDetailOption extends Component {
    public secondDetails: RefObject<any>;
    public content: RefObject<any>;
    public details: RefObject<any>;
    public animation: any;
    public isClosing: boolean = false;
    public isExpanding: boolean = false;

    constructor(props: any) {
        super(props);

        this.content = createRef();
        this.details = createRef();
        this.secondDetails = createRef();

        // Store the animation object (so we can cancel it if needed)
        this.animation = null;
        // Store if the element is closing
        this.isClosing = false;
        // Store if the element is expanding
        this.isExpanding = false;
    }

    onClick(e: any) {
        // Add an overflow on the <details> to avoid content overflowing
        e.preventDefault();
        this.details.current.style.overflow = 'hidden';
        // Check if the element is being closed or is already closed
        if (this.isClosing || !this.details.current.open) {
            this.open();
        // Check if the element is being openned or is already open
        } else if (this.isExpanding || this.details.current.open) {
            this.shrink();
        }
    }

    shrink() {
        // Set the element as "being closed"
        this.isClosing = true;

        // Store the current height of the element
        const startHeight = `${this.details.current.offsetHeight}px`;
        // Calculate the height of the summary
        const endHeight = `${this.details.current.firstChild.offsetHeight}px`;

        // If there is already an animation running
        if (this.animation) {
          // Cancel the current animation
          this.animation.cancel();
        }

        if(this.details.current.classList.contains('open')) {
            this.details.current.classList.remove('open');
        }

        // Start a WAAPI animation
        this.animation = this.details.current.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight]
        }, {
            duration: 400,
            easing: 'ease-out'
        });

        // When the animation is complete, call onAnimationFinish()
        this.animation.onfinish = () => this.onAnimationFinish(false);
        // If the animation is cancelled, isClosing variable is set to false
        this.animation.oncancel = () => this.isClosing = false;
    }

    open() {
        // Apply a fixed height on the element
        this.details.current.style.height = `${this.details.current.offsetHeight}px`;
        // Force the [open] attribute on the details element
        this.details.current.open = true;

        // Wait for the next frame to call the expand function
        window.requestAnimationFrame(() => this.expand());
    }

    expand() {
        // Set the element as "being expanding"
        this.isExpanding = true;
        // Get the current fixed height of the element
        const startHeight = `${this.details.current.offsetHeight}px`;
        // Calculate the open height of the element (summary height + content height)
        const endHeight = `${this.details.current.firstChild.offsetHeight + this.content.current.offsetHeight}px`;

        // If there is already an animation running
        if (this.animation) {
            // Cancel the current animation
            this.animation.cancel();
        }

        if(!this.details.current.classList.contains('open')) {
            this.details.current.classList.add('open');
        }

        // Start a WAAPI animation
        this.animation = this.details.current.animate({
            // Set the keyframes from the startHeight to endHeight
            height: [startHeight, endHeight]
        }, {
            duration: 400,
            easing: 'ease-out'
        });
        // When the animation is complete, call onAnimationFinish()
        this.animation.onfinish = () => this.onAnimationFinish(true);
        // If the animation is cancelled, isExpanding variable is set to false
        this.animation.oncancel = () => this.isExpanding = false;
    }

    onAnimationFinish(open: boolean) {
        // Set the open attribute based on the parameter
        this.details.current.open = open;
        // Clear the stored animation
        this.animation = null;
        // Reset isClosing & isExpanding
        this.isClosing = false;
        this.isExpanding = false;
        // Remove the overflow hidden and the fixed height
        this.details.current.style.height = this.details.current.style.overflow = '';
    }

    render() {
        console.log(this.props);
        return (
            <div className={clsx({
                [styles.AsideNavbarDetailOption]: true,
                'contracted': this.props.isContracted
            })}>
                <details ref={this.details}>
                    <summary className='flex w-full items-center gap-2' onClick={(e: any) => this.onClick(e)}>
                        {this.props.Icon && (
                            <span className='flex-shrink-0 option-icon'>
                                {this.props.Icon}
                            </span>
                        )}
                        <div className='flex w-full items-center justify-between'>
                            <span className='summary-text' role="term" aria-details="pure-css">{this.props.title}</span>
                            <span className='arrow'>
                                <LudiceIcons.ChevronDown width={18} height={18}/>
                            </span>
                        </div>
                    </summary>

                    <div
                        role="definition"
                        id="pure-css"
                        className="content"
                        ref={this.content}
                    >
                        <ul>
                            {(this.props.options ?? []).map((el: {Icon: string; title: string; href: string}, i: number) => {
                                const Icon = LudiceIcons[el.Icon];

                                return (
                                    <li key = {i}>
                                        <NavButton
                                            href={el.href}
                                            text={el.title}
                                            Icon={<Icon width={18} height={18} />}
                                            isContracted = {this.props.isContracted}
                                        />
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </details>
            </div>
        );
    }
}