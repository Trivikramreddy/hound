import React, { createRef } from 'react';
import { CoalesceMatches, ContentFor } from '../../utils';
import { Model } from '../../helpers/Model';
import { Match } from './Match';

export const File = (props) => {

    const { repo, rev, match, regexp } = props;
    const [ showContent, setShowContent] = useState(true);
    const filename = match.Filename;
    const blocks = CoalesceMatches(match.Matches);

    const textArea = createRef(null);

    const copyFilepath = (evt) => {
        evt.preventDefault();
        textArea.current.select();
        document.execCommand('copy');
    };

    const matches = blocks.map((block, index) => (
        <Match
            key={`match-${repo}-${index}`}
            block={ block }
            repo={ repo }
            regexp={ regexp }
            rev={ rev }
            filename={ filename }
        />
    ));

    const toggleContent = () => {
        setShowContent(!showContent)
    }

    return (
        <div className={"file" + (showContent ? "open" : "closed")}>
            <div className="title" onClick={ toggleContent }>
                <a href={ Model.UrlToRepo(repo, filename, null, rev) }>
                    { filename }
                </a>
                <a href="#" className="octicon octicon-clippy copy-file-path" title="Copy to clipboard" onClick={ copyFilepath }></a>
            </div>
            <div className="file-body">
                { matches }
            </div>
            <textarea className="copy-file-path-textarea" ref={ textArea } defaultValue={ filename }></textarea>
        </div>
    );

};
