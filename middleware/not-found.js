export default function notFound(req, res, next){
    res.status(404).send('No such route');
}