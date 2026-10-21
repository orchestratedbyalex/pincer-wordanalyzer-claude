import React from 'react';
// External libs
import { connect } from 'react-redux';

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
                        {FormViewFactory.create(props.view)}
                    </div>
                </>
            }
        </main>
    );
};

const mapStateToProps = (state: any) => ({ loader: state.application.loader, view: state.form.view });

export default connect(mapStateToProps)(Form);
