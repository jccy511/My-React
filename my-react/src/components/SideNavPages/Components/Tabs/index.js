import React, {Component} from 'react';
import './style.styl';
import {AppBar,Tabs,Tab, Paper, CodeBlock, ReactMarkdown} from '../../../';
import TabsTemplate from '../../../TabsTemplate'
import markdownFile from './markdown.md'

class TabsPage extends Component{
  constructor(props){
    super(props)
    this.state={
      selectedTab: 0,
      code: null
    }
  }

  componentWillMount() {
    fetch(markdownFile).then((response) => response.text()).then((text) => {
      this.setState({ code: text })
    })
  }

  buildMarkdown=()=>{
    return(<ReactMarkdown
      source={this.state.code}
      renderers={{code:CodeBlock}}
    />)
  }

  handleTabChange=(event,value)=>{
    this.setState({
      selectedTab: value
    })
  }

  render(){
    const value = this.state.selectedTab;
    const content =(
      <div>
        <Paper>
          <AppBar className="app-bar" position="static">
            <Tabs value={value} onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            >
              <Tab label="Tab 1" className="tab"/>
              <Tab label="Tab 2" className="tab"/>
            </Tabs>
          </AppBar>
          <div>
            {value === 0 && <div>Content 1</div>}
            {value === 1 && <div>Content 2</div>}
          </div>
        </Paper>
      </div>
    )
    return(
      <div className="demo-tabs">
        <TabsTemplate label="Tabs"
          content={content}
          markdown={this.buildMarkdown()}
        />
      </div>
    )
  }
}

export default TabsPage;
