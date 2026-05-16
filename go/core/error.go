package core

type SumoError struct {
	IsSumoError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewSumoError(code string, msg string, ctx *Context) *SumoError {
	return &SumoError{
		IsSumoError: true,
		Sdk:              "Sumo",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *SumoError) Error() string {
	return e.Msg
}
