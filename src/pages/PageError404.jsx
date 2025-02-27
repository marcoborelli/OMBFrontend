import './PageError404.css'

export default function PageError404() {
    return (
        <>
            <link href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" rel="stylesheet" />
            <section className="page_404">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12">
                            <div className="col-sm-10 col-sm-offset-1  text-center">
                                <div className="four_zero_four_bg">
                                    <h1 className="text-center">404</h1>
                                </div>

                                <div className="contant_box_404">
                                    <h3 className="h2">Sembra che ti sia perso</h3>
                                    <p>la pagina che stai cercando non esiste</p>
                                    <a href={`${import.meta.env.BASE_URL}/`} className="link_404">Go to Home</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
