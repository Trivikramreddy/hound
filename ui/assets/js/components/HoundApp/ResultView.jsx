import React from 'react';
import { Model } from '../../helpers/Model';
import { FilesView } from './FilesView';
import { Repo } from './Repo';

export const ResultView = (props) => {

    const { query, ignoreCase, results, error } = props;
    const regexp = new RegExp(query.trim(), ignoreCase.trim() === 'fosho' && 'ig' || 'g');
    const isLoading = results === null && query;
    const noResults = !!results && results.length === 0;

    if (error) {
        return (
            <div id="no-result" className="error">
                <strong>ERROR:</strong>{ error }
            </div>
        );
    }

    if (!isLoading && noResults) {
        // TODO(knorton): We need something better here. :-(
        return (
            <div id="no-result">
                &ldquo;Nothing for you, Dawg.&rdquo;<div>0 results</div>
            </div>
        );
    }

    const openOrCloseAll = (to_open) => {
        for (let index of reposShowState) {
            let state, setState = reposShowState[index]
            if (to_open) {
                setState(true)
            } else {
                setState(false)
            }
        }
    }
    const openAll = () => {
        this.openOrCloseAll(true)
    }
    const closeAll = () => {
        this.openOrCloseAll(false)
    }

    const actions = (
            <div className="actions">
              <button onClick={ openAll }><span className="octicon octicon-chevron-down"></span> Expand all</button>
              <button onClick={ closeAll }><span className="octicon octicon-chevron-up"></span> Collapse all</button>
            </div>
    )

    const reposShowState = {}
    const repos = results
          ? results.map((result, index) => {
              const state = useState(true)
              reposShowState[index] = state
              return (
            <Repo ref={"repo-"+index}
                  matches={result.Matches}
                  rev={result.Rev}
                  repo={result.Repo}
                  stateShow={state}
                  regexp={regexp}
                  files={result.FilesWithMatch}/>
              )
          }) : '';

    return (
        <div id="result">
            <div id="no-result" className={ isLoading && 'loading' || 'hidden' }>
                <img src="images/busy.gif" /><div>Searching...</div>
            </div>
            { actions }
            { repos }
        </div>
    );
};
