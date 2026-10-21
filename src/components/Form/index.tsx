import React from 'react';
// External libs
import { connect } from 'react-redux';
import { AnimatePresence } from 'framer-motion';

// local componets
import AppLoader from '../Loader';
import Masthead from '../Masthead';

// interfaces
import { IForm } from '../../interfaces/IForm';

// factories
import { FormViewFactory } from '../../factories/FormViewFactory';

// Styles
import './Form.css';

const Form: React.FunctionComponent<IForm> = (props: IForm) => {
    return (
        <main className='formWrapper'>
            {props.loader.isLoading ?
                <AppLoader />
                :
                <>
                    <Masthead />
                    <div className='appContent'>
                        {/* the outgoing view finishes its exit before the next one enters */}
                        <AnimatePresence exitBeforeEnter>
                            <React.Fragment key={props.view}>
                                {FormViewFactory.create(props.view)}
                            </React.Fragment>
                        </AnimatePresence>
                    </div>
                </>
            }
        </main>
    );
};

const mapStateToProps = (state: any) => ({ loader: state.application.loader, view: state.form.view });

export default connect(mapStateToProps)(Form);
