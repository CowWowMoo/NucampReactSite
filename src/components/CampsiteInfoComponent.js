import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, Label, Button, Card, CardImg, CardImgOverlay, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, Errors, LocalForm } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

const required=(val) => val && val.length;
const maxLength=(len) => val => !val || val.length <= len;
const minLength=(len) => val => val && val.length >= len;
const isNumber=(val) => !isNaN(+val);

class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false}

        this.handleSubmit=this.handleSubmit.bind(this);
        this.toggleModal=this.toggleModal.bind(this);
    }

    handleSubmit(values) {
        console.log(values.author)
        alert(`Author: ${values.author} \n
        Comments: ${values.text} \n Rating: ${values.rating}`)
        this.toggleModal()
        this.props.postComment(this.props.campsiteId, values.rating, values.author, values.text);
    }

    toggleModal() {
        this.setState({isModalOpen: !this.state.isModalOpen})
    }

    render() {
        return (
            <>
                <Button onClick={this.toggleModal} outline color="secondary"><i className="fa fa-pencil fa-lg"/> Submit Comment</Button>

                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>
                        Submit Comment
                    </ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <div className="form-group">
                                <Label htmlFor="rating">Rating</Label>
                                <Control.select className="form-control" model=".rating" id="rating" name="rating" placeholder="rating" validators={{required, isNumber, minLength: minLength(1), maxLength: maxLength(5)}}>
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    <option>5</option>
                                </Control.select>
                                <Errors className="text-danger" model=".rating" component="li" show="touched" messages={{required:"required", minLength:"Must be at least one number"
                            , maxLength:"Must be 5 or less"}}></Errors>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="author">Your Name</Label>
                                <Control.text className="form-control" model=".author" id="author" name="author" placeholder="Your Name" validators={{required, minLength: minLength(1), maxLength: maxLength(15)}}>

                                </Control.text>
                                <Errors className="text-danger" model=".author" component="li" show="touched" messages={{required:"required", minLength:"Must be at least one character"
                            , maxLength:"Must be 15 or less"}}></Errors>
                            </div>
                            <div className="form-group">
                                <Label htmlFor="text">Comment</Label>
                                <Control.textarea className="form-control" model=".text" id="text" name="text" placeholder="text" validators={{required, minLength: minLength(1), maxLength: maxLength(40)}}>
                                    
                                </Control.textarea>
                                <Errors className="text-danger" model=".text" component="li" show="touched" messages={{required:"required", minLength:"Must be at least one character"
                            , maxLength:"Must be 40 or less"}}></Errors>
                            </div>
                            <Button>Submit</Button>
                        </LocalForm>
                    </ModalBody>
                </Modal>

            </>
        );
    }
}

function RenderCampsite({campsite}) {
        return(
            <div className='col-md-5 m-1'>
                 <Card>
                    <CardImg top src={baseUrl + campsite.image} alt={campsite.name} />
                    <CardBody>
                        <CardText>{campsite.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        );
    }
function RenderComments({comments, postComment, campsiteId}){
    if (comments){
        return(
            <div className='col-md-5 m-1'>
                <h4>Comments</h4>
                {comments.map(comment => {
                    return(
                        <div key={comment.id}>
                             <p>{comment.text}</p> <br/>
                             -- {comment.author}, {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', 
                            day: '2-digit'}).format(new Date(Date.parse(comment.date)))}
                        </div>
                    )
                })}
                <CommentForm campsiteId={campsiteId} postComment={postComment} />
            </div>
        )
    }
}
function CampsiteInfo(props) {
    if (props.isLoading) {
        return (
            <div className="container">
                <div className="row">
                    <Loading />
                </div>
            </div>
        );
    }
    if (props.errMess) {
        <div className="row">
            <div classname="col">
                <h4>{props.errMess}</h4>
            </div>
        </div>
    }
    if (props.campsite) {
        return (
            <div className="container">
                <div className="row">
                    <div className="col">
                        <Breadcrumb>
                                <BreadcrumbItem><Link to="/Directory">Directory</Link></BreadcrumbItem>
                                <BreadcrumbItem active>{props.campsite.name}</BreadcrumbItem>
                            </Breadcrumb>
                        <h2>{props.campsite.name}</h2>
                        <hr />
                    </div>
            </div>
            <div className='row'>
                <RenderCampsite campsite={props.campsite} />
                <RenderComments 
                    comments={props.comments} 
                    postComment={props.postComment}
                    campsiteId={props.campsite.id}
                />
            </div>
        </div>
        );
    }
    return <div />;
}


export default CampsiteInfo;

 