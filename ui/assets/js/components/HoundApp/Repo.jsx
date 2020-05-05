import React from 'react';
import { Model } from '../../helpers/Model';
import { FilesView } from './FilesView';

export const Repo = (props) => {
    const { ref, repo, rev, matches, regexp, files, stateShow } = props;
    const [ showContent, setShowContent] = stateShow

    const toggleContent = () => {
        setShowContent(!showContent)
    }
    const open = () => {
        setShowContent(true)
    }
    const close = () => {
        setShowContent(false)
    }

    return (
        <div className={"repo" + (showContent ? "open" : "closed")} key={ ref }>
          <div className="title" onClick={ toggleContent }>
            <span className="mega-octicon octicon-repo"></span>
            <span className="name">{ Model.NameForRepo(repo) }</span>
            <span className={"indicator octicon octicon-chevron-"+ (showContent ? "up" : "down" )} onClick={ toggleContent }></span>
          </div>
          <FilesView
            matches={ matches }
            rev={ rev }
            repo={ repo }
            regexp={ regexp }
            totalMatches={ files }
            />
        </div>
    )
}

/*

import React from 'react';
import { Model } from '../../helpers/Model';
import { FilesView } from './FilesView';

class Repo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {visible: true};
    }

//    const { ref, repo, rev, matches, regexp, files } = props;
//    const [ showContent, setShowContent] = useState(true);

    toggleContent() {
        this.setState({
            visible: !this.state.visible
        })
    }
    open () {
        this.setState({
            visible: true
        })
    }
    close () {
        this.setState({
            visible: false
        })
    }

    render () {
        return (
        <div className={"repo" + (this.state.visible ? "open" : "closed")}>
          <div className="title" onClick={ this.toggleContent }>
            <span className="mega-octicon octicon-repo"></span>
            <span className="name">{ Model.NameForRepo(repo) }</span>
            <span className={"indicator octicon octicon-chevron-"+ (this.state.visible ? "up" : "down" )} onClick={ this.toggleContent }></span>
          </div>
          <FilesView
            matches={ this.props.matches }
            rev={ this.props.rev }
            repo={ this.props.repo }
            regexp={ this.props.regexp }
            totalMatches={ this.props.files }
            />
        </div>
        )
    }
}


  */
