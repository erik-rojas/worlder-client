import React from 'react'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const config = {
  appId: "1582691115194133",
  scope: "email, public_profile, user_photos",
}

export const FacebookButton = ({ fbClick, fbResponse, buttonText }) => (
  <FacebookLogin
    appId={config.appId}
    autoLoad={false}
    scope={config.scope}
    version={config.version}
    onClick={fbClick}
    callback={fbResponse}
    render={fbProps =>
      <div>
        {!fbProps.isSdkLoaded &&
          <div className="iwj-btn iwj-btn-primary iwj-btn-full iwj-btn-large iwj-register-btn">
            <span>loading...</span>
          </div>
        }
        {
          fbProps.isProcessing &&
          <div className="iwj-btn iwj-btn-primary iwj-btn-full iwj-btn-large iwj-register-btn">
            <span>Authenticating...</span>
          </div>
        }
        {
          fbProps.isSdkLoaded && !fbProps.isProcessing &&
          <span className="iwj-btn iwj-btn-primary iwj-btn-full iwj-btn-large iwj-register-btn iwj-facebook-btn" onClick={fbProps.onClick}>
            <i className="fa fa-facebook-square icon-facebook" />
            <span>{buttonText}</span>
          </span>
        }
      </div>
    }
  />
)