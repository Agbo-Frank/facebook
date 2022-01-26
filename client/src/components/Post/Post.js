import './post.css'

function Post(){
    return(
        <div className='post'>
            <div>
                <img src="" alt="profile" />
                <div>
                    <strong>Agbo Francis</strong>
                    <small>7h</small>
                </div>
            </div>
            <div className='text'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sed aliquam maiores, incidunt qui totam neque atque natus dolores 
                nesciunt quibusdam earum placeat aliquid alias suscipit distinctio vel reiciendis repellat. Exercitationem?
            </div>
            <img src='' alt='postImage' />
            <div>
                <span>
                    <img src='' alt='like'/>
                </span>
            </div>
        </div>
    )
}

export default Post